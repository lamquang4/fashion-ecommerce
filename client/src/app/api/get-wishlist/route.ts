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

    if (wishlistId) {
      matchCondition = { _id: new mongoose.Types.ObjectId(wishlistId) };
    } else if (userId) {
      matchCondition = { user: new mongoose.Types.ObjectId(userId) };
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
