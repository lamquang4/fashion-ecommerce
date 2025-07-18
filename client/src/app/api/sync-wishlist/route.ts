import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import Wishlist from "@/model/Wishlist";
import { connectMongoDB } from "@/lib/MongoConnect";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    if (!userId)
      return NextResponse.json(
        { msg: "Người dùng chưa đăng nhập" },
        { status: 401 }
      );

    const wishlistId = req.cookies.get("wishlist")?.value;

    if (!wishlistId || !mongoose.Types.ObjectId.isValid(wishlistId)) {
      return NextResponse.json(
        { msg: "Không tìm thấy yêu thích" },
        { status: 400 }
      );
    }

    const guestWishlist = await Wishlist.findById(wishlistId);
    const userWishlist = await Wishlist.findOne({ user: userId });

    if (guestWishlist && guestWishlist.user == null) {
      if (userWishlist) {
        for (const item of guestWishlist.items) {
          const exists = userWishlist.items.some(
            (it: any) => it.variant.toString() === item.variant.toString()
          );
          if (!exists) {
            userWishlist.items.push(item);
          }
        }
        await userWishlist.save();
        await Wishlist.findByIdAndDelete(guestWishlist._id);
      } else {
        guestWishlist.user = userId;
        await guestWishlist.save();
      }
    }

    const response = NextResponse.json({ status: 200 });
    response.cookies.set({
      name: "wishlist",
      value: "",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ msg: "Lỗi", error }, { status: 500 });
  }
}
