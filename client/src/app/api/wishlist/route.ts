import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import Wishlist from "@/model/Wishlist";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);
    const userId = session?.user?.id;

    const wishlistId = req.cookies.get("wishlist")?.value;

    let matchCondition: any = null;

    if (userId) {
      matchCondition = { user: new mongoose.Types.ObjectId(userId) };
    } else if (wishlistId) {
      matchCondition = { _id: new mongoose.Types.ObjectId(wishlistId) };
    }

    if (!matchCondition) {
      return NextResponse.json(
        {
          msg: "Không biết",
        },
        { status: 400 }
      );
    }

    const wishlist = await Wishlist.aggregate([
      { $match: matchCondition },
      { $unwind: "$items" },

      {
        $lookup: {
          from: "inventories",
          localField: "items.variant",
          foreignField: "_id",
          as: "variantData",
        },
      },
      { $unwind: "$variantData" },

      {
        $lookup: {
          from: "products",
          localField: "variantData.product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },

      {
        $lookup: {
          from: "colors",
          localField: "variantData.color",
          foreignField: "_id",
          as: "colorData",
        },
      },
      { $unwind: "$colorData" },

      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          productsInWishlist: {
            $push: {
              _id: "$productData._id",
              name: "$productData.name",
              slug: "$productData.slug",
              variant: {
                _id: "$variantData._id",
                images: "$variantData.images",
                color: {
                  _id: "$colorData._id",
                  namecolor: "$colorData.namecolor",
                  codecolor: "$colorData.codecolor",
                },
              },
            },
          },
        },
      },
    ]);

    if (!wishlist || wishlist.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(wishlist[0], { status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}

// thêm biến thể của sản phẩm đó vào yêu thích
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);
    const userId = session?.user?.id || null;

    const { variant } = await req.json();
    const wishlistId = req.cookies.get("wishlist")?.value;

    let wishlist = null;

    if (userId && wishlistId && mongoose.Types.ObjectId.isValid(wishlistId)) {
      const guestWishlist = await Wishlist.findById(wishlistId);
      const userWishlist = await Wishlist.findOne({ user: userId });

      if (guestWishlist && guestWishlist.user == null) {
        if (userWishlist) {
          for (const item of guestWishlist.items) {
            const exists = userWishlist.items.some(
              (it: any) => it.variant.toString() === item.variant.toString()
            );
            if (!exists) userWishlist.items.push(item);
          }

          await userWishlist.save();
          await Wishlist.findByIdAndDelete(guestWishlist._id);
          wishlist = userWishlist;
        } else {
          guestWishlist.user = userId;
          await guestWishlist.save();
          wishlist = guestWishlist;
        }
      }
    }

    if (!wishlist) {
      if (userId) {
        wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
          wishlist = await Wishlist.create({ user: userId, items: [] });
        }
      } else if (wishlistId && mongoose.Types.ObjectId.isValid(wishlistId)) {
        wishlist = await Wishlist.findById(wishlistId);
      }

      if (!wishlist) {
        wishlist = await Wishlist.create({ user: null, items: [] });
      }
    }

    const alreadyExists = wishlist.items.some(
      (item: any) => item.variant.toString() === variant
    );

    if (!alreadyExists) {
      wishlist.items.push({ variant });
      await wishlist.save();
    }

    const response = NextResponse.json({ status: 201 });

    if (!userId && !wishlistId) {
      response.cookies.set({
        name: "wishlist",
        value: String(wishlist._id),
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }

    if (userId && wishlistId) {
      response.cookies.set({
        name: "wishlist",
        value: "",
        path: "/",
        expires: new Date(0),
      });
    }

    return response;
  } catch (err) {
    return NextResponse.json({ msg: "Lỗi server", err }, { status: 500 });
  }
}

// xóa biến thể của sản phẩm đó khỏi yêu thích
export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();
    const { wishlistId, variant } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(wishlistId)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const wishlist = await Wishlist.findById(wishlistId);

    if (!wishlist) {
      return NextResponse.json(
        { msg: "Không tìm thấy yêu thích" },
        { status: 404 }
      );
    }

    wishlist.items = wishlist.items.filter(
      (item: any) => item.variant.toString() !== variant
    );

    await wishlist.save();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Lỗi", err }, { status: 500 });
  }
}


