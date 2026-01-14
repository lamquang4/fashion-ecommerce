import { connectMongoDB } from "@/lib/MongoConnect";
import Blog from "@/model/Blog";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const body = await req.json();

    const { status } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    await Blog.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
