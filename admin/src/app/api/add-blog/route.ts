import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Blog from "@/model/Blog";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { removeVietNamese } from "@/utils/removeVietnamese";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File;
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    const checkTitle = await Blog.findOne({ title });
    if (checkTitle) {
      return NextResponse.json(
        {
          msg: `Tiêu đề bài viết đã sử dụng`,
        },
        { status: 409 }
      );
    }

    if (file.size === 0 || !file) {
      return NextResponse.json({ msg: "Hình không để trống" }, { status: 404 });
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { msg: `Hình "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.` },
        { status: 400 }
      );
    }

    const maxSizeKB = 1000; // 1000KB
    if (file.size / 1024 > maxSizeKB) {
      return NextResponse.json(
        { msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.` },
        { status: 400 }
      );
    }

    // thư mục của hình
    const slug = removeVietNamese(title);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "aura-fashion/blog",
          public_id: `${slug}-${Date.now()}`,
          resource_type: "image",
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );
      stream.end(buffer);
    });

    const imagePath = result.secure_url;

    await Blog.create({
      summary,
      title,
      image: imagePath,
      slug: slug,
      content,
      user: userId,
      status: 0,
    });

    return NextResponse.json({ status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
