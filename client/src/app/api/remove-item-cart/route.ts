import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/model/Cart";
import mongoose from "mongoose";

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();

    const { cartId, variant, size } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter(
      (item: any) =>
        item.variant.toString() !== variant || item.size.toString() !== size
    );

    await cart.save();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}
