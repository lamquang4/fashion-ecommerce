import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
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

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { msg: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    return NextResponse.json({ category: updatedCategory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
