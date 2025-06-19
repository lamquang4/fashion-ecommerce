import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
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
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const newInventories = JSON.parse(formData.get("newInventories") as string);
    const slug = removeVietNamese(name);

    if (price < discount) {
      return NextResponse.json(
        { msg: "Giá sản phẩm phải lớn hơn giá giảm" },
        { status: 400 }
      );
    }
    const checkName = await Product.findOne({ name });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên sản phẩm đã được sử dụng" },
        { status: 409 }
      );
    }

    const files = formData.getAll("image") as File[];

    if (files.length > 5) {
      return NextResponse.json(
        { msg: "Hình sản phẩm không vượt quá 5 hình" },
        { status: 404 }
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
            msg: `Hình "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.`,
          },
          { status: 415 }
        );
      }

      if (file.size / 1024 > maxSizeKB) {
        return NextResponse.json(
          { msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.` },
          { status: 413 }
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

    const seen = new Set();

    for (let i = 0; i < newInventories.length; i++) {
      const newInventory = newInventories[i];
      const key = `${newInventory.size}-${newInventory.color}`;

      if (seen.has(key)) {
        return NextResponse.json(
          { msg: "Sản phẩm này bị trùng size và màu." },
          { status: 409 }
        );
      }

      seen.add(key);

      await Inventory.create({
        product: newProduct._id,
        size: newInventory.size,
        color: newInventory.color,
        quantity: Number(newInventory.quantity),
      });
    }

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
