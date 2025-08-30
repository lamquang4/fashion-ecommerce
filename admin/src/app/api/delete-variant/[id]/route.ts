import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import OrderDetail from "@/model/OrderDetail";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const variant = await Inventory.findById(id);
    if (!variant) {
      return NextResponse.json(
        { msg: "Không tìm thấy biến thế của sản phẩm" },
        { status: 404 }
      );
    }

    const existed = await OrderDetail.findOne({
      items: {
        $elemMatch: {
          product: variant.product,
          color: variant.color,
        },
      },
    });

    if (existed) {
      return NextResponse.json(
        {
          msg: "Biến thể của sản phẩm này đã được khách đặt hàng nên không thể xóa!",
        },
        { status: 400 }
      );
    }

    const deleteVariant = await Inventory.findByIdAndDelete(id);

    return NextResponse.json({ deleteVariant }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
