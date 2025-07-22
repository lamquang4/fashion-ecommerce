import { connectMongoDB } from "@/lib/MongoConnect";
import Cart from "@/model/Cart";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const cart = await Cart.findById(id);
    if (!cart) {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    const deleteCart = await Cart.findByIdAndDelete(id);

    return NextResponse.json({ cart: deleteCart }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
