import { connectMongoDB } from "@/lib/MongoConnect";
import Color from "@/model/Color";
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

    const { colorname, colorcode } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const color = await Color.findById(id);
    if (!color) {
      return NextResponse.json({ msg: "Không tìm thấy màu" }, { status: 404 });
    }

    const checkName = await Color.findOne({ colorname, _id: { $ne: id } });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên màu đã được sử dụng" },
        { status: 400 }
      );
    }

    const updatedData: any = {
      colorname,
      colorcode,
    };

    const updatedColor = await Color.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({ user: updatedColor }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
