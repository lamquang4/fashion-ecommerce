import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/model/Cart";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { cartId, variant, size, quantity } = await req.json();

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

    const item = cart.items.find(
      (item: any) =>
        item.variant.toString() === variant && item.size.toString() === size
    );

    if (!item) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm trong giỏ" },
        { status: 404 }
      );
    }

    item.quantity = quantity;
    await cart.save();

    return NextResponse.json({});
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}
