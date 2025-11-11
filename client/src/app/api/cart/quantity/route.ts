import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Cart from "@/model/Cart";

// thay đổi số lượng của 1 biến thể sản phẩm đó trong giỏ hàng
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { cartId, variant, size, quantity } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    if(quantity < 1){
      return NextResponse.json({ msg: "Số lượng mua phải lớn hơn 1" }, { status: 409 });
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

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}