import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import Size from "@/model/Size";
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

    const checkSize = await Inventory.findOne({ "inventories.size": id });
    if (checkSize) {
      return NextResponse.json(
        {
          msg: "Kích thước này đẫ được sử dụng cho biến thể của sản phẩm nên không thể xóa!",
        },
        {
          status: 409,
        }
      );
    }

    const size = await Size.findById(id);
    if (!size) {
      return NextResponse.json(
        { msg: "Không tìm thấy kích thước" },
        { status: 404 }
      );
    }

    const deleteSize = await Size.findByIdAndDelete(id);

    return NextResponse.json({ size: deleteSize }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
