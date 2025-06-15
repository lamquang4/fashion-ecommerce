import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
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

    const size = await Size.findById(id);
    if (!size) {
      return NextResponse.json(
        { msg: "Không tìm thấy kích thước" },
        { status: 404 }
      );
    }

    const deleteSize = await Size.findByIdAndDelete(id);

    return NextResponse.json({ Size: deleteSize }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
