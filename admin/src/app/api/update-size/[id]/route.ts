import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const body = await req.json();

    const { namesize } = body;

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

    const checkName = await Size.findOne({ namesize, _id: { $ne: id } });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên kích thước đã được sử dụng" },
        { status: 400 }
      );
    }

    const updatedData: any = {
      namesize,
    };

    const updatedSize = await Size.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({ size: updatedSize }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
