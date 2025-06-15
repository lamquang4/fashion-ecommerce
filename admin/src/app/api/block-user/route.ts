import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();

    const { id, status } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { msg: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    return NextResponse.json({ user: updatedUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
