import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Blog from "@/model/Blog";
import { extractPublicId } from "@/utils/extractPublicId";
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

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    if (blog.image) {
      const publicId = extractPublicId(blog.image);
      await cloudinary.uploader.destroy(publicId);
    }

    await Blog.findByIdAndDelete(id);

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
