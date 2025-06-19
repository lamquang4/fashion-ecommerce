import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { removeVietNamese } from "@/utils/removeVietnamese";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
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

    const checkName = await Category.findOne({ namecategory });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên danh mục đã được sử dụng" },
        { status: 400 }
      );
    }

    if (!file || file.size === 0) {
      return NextResponse.json(
        { msg: "Vui lòng chọn một Hình." },
        { status: 400 }
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
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uploadDirAdmin = path.join(process.cwd(), "/public/uploads/category");
    const uploadDirClient = path.join(
      process.cwd(),
      `../client/public/uploads/category`
    );
    await fs.mkdir(uploadDirAdmin, { recursive: true });
    await fs.mkdir(uploadDirClient, { recursive: true });

    const slug = removeVietNamese(namecategory);
    const ext = file.name.split(".").pop(); // png, jpg, webp
    const fileName = `${slug}.${ext}`;
    const filePathAdmin = path.join(uploadDirAdmin, fileName);
    const filePathClient = path.join(uploadDirClient, fileName);
    await fs.writeFile(filePathAdmin, buffer);
    await fs.writeFile(filePathClient, buffer);

    const imagePath = `/uploads/category/${fileName}`;

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
