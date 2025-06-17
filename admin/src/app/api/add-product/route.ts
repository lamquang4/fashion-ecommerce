import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
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
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const discount = formData.get("discount") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const slug = removeVietNamese(name);

    const checkName = await Product.findOne({ name });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên sản phẩm đã được sử dụng" },
        { status: 400 }
      );
    }

    const files = formData.getAll("image") as File[];

    if (!files.length) {
      return NextResponse.json(
        { msg: "Bạn chưa tải ảnh lên" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    const maxSizeKB = 1000;

    const uploadDirAdmin = path.join(process.cwd(), "/public/uploads/product");
    const uploadDirClient = path.join(
      process.cwd(),
      `../client/public/uploads/product`
    );

    await fs.mkdir(uploadDirAdmin, { recursive: true });
    await fs.mkdir(uploadDirClient, { recursive: true });

    const imagePaths: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            msg: `Ảnh "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.`,
          },
          { status: 400 }
        );
      }

      if (file.size / 1024 > maxSizeKB) {
        return NextResponse.json(
          { msg: `Ảnh "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.` },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const ext = file.name.split(".").pop();
      const fileName = `${slug}-${i}.${ext}`;
      const filePathAdmin = path.join(uploadDirAdmin, fileName);
      const filePathClient = path.join(uploadDirClient, fileName);

      await fs.writeFile(filePathAdmin, buffer);
      await fs.writeFile(filePathClient, buffer);

      imagePaths.push(`/uploads/product/${fileName}`);
    }

    const newProduct = await Product.create({
      name,
      price,
      discount,
      description,
      category,
      slug,
      status: 0,
      image: imagePaths,
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
