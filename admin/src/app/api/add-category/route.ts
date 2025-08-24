import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
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
    const namecategory = formData.get("namecategory") as string;
    const gender = Number(formData.get("gender"));
    const file = formData.get("image") as File;

    const checkName = await Category.findOne({ namecategory, gender });
    if (checkName) {
      return NextResponse.json(
        {
          msg: `Tên danh mục này đã được dùng cho giới tính ${
            gender === 0 ? "nữ" : "nam"
          }.`,
        },
        { status: 400 }
      );
    }

    if (file.size === 0 || !file) {
      return NextResponse.json(
        { msg: "danh mục không để trống" },
        { status: 404 }
      );
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
    const slug1 = removeVietNamese(namecategory);
    const slug2 = removeVietNamese(gender === 0 ? "Nữ" : "Nam");
    const slug = `${slug1}-${slug2}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "aura-fashion/category",
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

    const newCategory = await Category.create({
      namecategory,
      gender,
      image: imagePath,
      slug: slug,
      status: 0,
    });

    return NextResponse.json({ user: newCategory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
