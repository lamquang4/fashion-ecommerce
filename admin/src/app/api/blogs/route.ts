import { connectMongoDB } from "@/lib/MongoConnect";
import Blog from "@/model/Blog";
import { NextRequest, NextResponse } from "next/server";
import { removeVietNamese } from "@/utils/removeVietnamese";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";
    const query: any = {};
    if (q) {
      query.title = { $regex: q, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [blogs, total] = await Promise.all([
      Blog.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            content: 0,
            summary: 0,
          },
        },
      ]),
      Blog.countDocuments(query),
    ]);

    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        blogs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}

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
    const status = Number(formData.get("status"));
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
      status,
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
