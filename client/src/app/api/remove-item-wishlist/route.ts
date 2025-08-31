import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Wishlist from "@/model/Wishlist";
import { connectMongoDB } from "@/lib/MongoConnect";

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
