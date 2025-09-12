import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Blog from "@/model/Blog";
import { extractPublicId } from "@/utils/extractPublicId";
import { removeVietNamese } from "@/utils/removeVietnamese";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    const checkTitle = await Blog.findOne({
      title,
      _id: { $ne: id },
    });
    if (checkTitle) {
      return NextResponse.json(
        {
          msg: `Tiêu đề bài viết đã sử dụng`,
        },
        { status: 409 }
      );
    }

    const slug = removeVietNamese(title);
    let imagePath = blog.image;

    if (file && file.size > 0) {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            msg: `Hình "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.`,
          },
          { status: 400 }
        );
      }

      const maxSizeKB = 1000;
      if (file.size / 1024 > maxSizeKB) {
        return NextResponse.json(
          {
            msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.`,
          },
          { status: 400 }
        );
      }

      // Xóa ảnh cũ
      const publicId = extractPublicId(blog.image);
      await cloudinary.uploader.destroy(publicId);

      // Thêm ảnh mới
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `aura-fashion/blog`, // thư mục
            public_id: `${slug}-${Date.now()}`, // tên file
            resource_type: "image",
            transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      imagePath = result.secure_url;
    }

    const updatedData = {
      title,
      image: imagePath,
      slug: slug,
      content,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({ blog: updatedBlog }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
