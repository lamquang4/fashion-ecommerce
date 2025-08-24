import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import Product from "@/model/Product";
import { removeVietNamese } from "@/utils/removeVietnamese";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

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

      const imagePaths: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            {
              msg: `Hình "${file.name}" ở biến thể thứ ${
                blockIndex + 1
              } không đúng định dạng PNG, JPG hoặc WEBP.`,
            },
            { status: 404 }
          );
        }

        if (file.size / 1024 > maxSizeKB) {
          return NextResponse.json(
            {
              msg: `Hình "${file.name}" ở biến thể thứ ${
                blockIndex + 1
              } vượt quá dung lượng ${maxSizeKB}KB.`,
            },
            { status: 404 }
          );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result: any = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `aura-fashion/product`, // tên thư mục
              public_id: `${slug}-${Date.now()}`, // tên hình
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

        imagePaths.push(result.secure_url);
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
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
