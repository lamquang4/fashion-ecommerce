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
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name,
      price,
      discount,
      description,
      category,
      slug,
      status: 0,
    });

    const newInventoryBlocks = JSON.parse(
      formData.get("newInventories") as string
    );

    for (
      let blockIndex = 0;
      blockIndex < newInventoryBlocks.length;
      blockIndex++
    ) {
      const block = newInventoryBlocks[blockIndex];
      const files = formData.getAll(`images-${blockIndex}`) as File[];

      if (files.length > 5) {
        return NextResponse.json(
          { msg: "Hình sản phẩm biến thể thứ i không vượt quá 5 hình" },
          { status: 404 }
        );
      }

      if (files.length === 0 || !files) {
        return NextResponse.json(
          { msg: "Hình sản phẩm biến thể thứ i không để trống" },
          { status: 404 }
        );
      }

      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      const maxSizeKB = 1000;

      const uploadDirAdmin = path.join(
        process.cwd(),
        "/public/uploads/product"
      );
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
              msg: `Hình "${file.name}" ở biến thể thứ i không đúng định dạng PNG, JPG hoặc WEBP.`,
            },
            { status: 404 }
          );
        }

        if (file.size / 1024 > maxSizeKB) {
          return NextResponse.json(
            {
              msg: `Hình "${file.name}" ở biến thể thứ i vượt quá dung lượng ${maxSizeKB}KB.`,
            },
            { status: 404 }
          );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const ext = file.name.split(".").pop();
        const timestamp = Date.now();
        const fileName = `${slug}-${timestamp}-${i}.${ext}`;
        const filePathAdmin = path.join(uploadDirAdmin, fileName);
        const filePathClient = path.join(uploadDirClient, fileName);

        await fs.writeFile(filePathAdmin, buffer);
        await fs.writeFile(filePathClient, buffer);

        imagePaths.push(`/uploads/product/${fileName}`);
      }

      await Inventory.create({
        product: newProduct._id,
        images: imagePaths,
        color: block.color,
        inventories: block.inventories.map((inv: any) => ({
          quantity: inv.quantity,
          size: inv.size,
        })),
      });
    }

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
