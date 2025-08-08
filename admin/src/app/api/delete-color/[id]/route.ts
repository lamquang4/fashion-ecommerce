import { connectMongoDB } from "@/lib/MongoConnect";
import Color from "@/model/Color";
import Inventory from "@/model/Inventory";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const checkColor = await Inventory.findOne({ color: id });
    if (checkColor) {
      return NextResponse.json(
        {
          msg: "Màu này đẫ được sử dụng cho biến thể của sản phẩm nên không thể xóa!",
        },
        {
          status: 400,
        }
      );
    }

    const color = await Color.findById(id);
    if (!color) {
      return NextResponse.json({ msg: "Không tìm thấy màu" }, { status: 404 });
    }

    const deleteColor = await Color.findByIdAndDelete(id);

    return NextResponse.json({ color: deleteColor }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
