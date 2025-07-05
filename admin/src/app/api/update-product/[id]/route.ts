import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import Inventory from "@/model/Inventory";
import { removeVietNamese } from "@/utils/removeVietnamese";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
import Category from "@/model/Category";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const slug = removeVietNamese(name);
    const files = formData.getAll("image") as File[];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    if (price < discount) {
      return NextResponse.json(
        { msg: "Giá sản phẩm phải lớn hơn giá giảm" },
        { status: 404 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { msg: "Hình sản phẩm không vượt quá 5 hình" },
        { status: 404 }
      );
    }

    if (product.image.length === 5) {
      return NextResponse.json(
        { msg: "Sản phẩm đã đủ 5 ảnh" },
        { status: 404 }
      );
    }

    const checkName = await Product.findOne({ name, _id: { $ne: id } });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên sản phẩm đã được sử dụng" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    const maxSizeKB = 1000;

    const uploadDirAdmin = path.join(process.cwd(), "/public/uploads/product");
    const uploadDirClient = path.join(
      process.cwd(),
      "../client/public/uploads/product"
    );

    await fs.mkdir(uploadDirAdmin, { recursive: true });
    await fs.mkdir(uploadDirClient, { recursive: true });

    let imagePaths: string[] = [...product.image];

    // thêm hình nếu sản phẩm chưa đủ 5 hinh
    if (files.length > 0 && files[0].size > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            {
              msg: `Hình "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.`,
            },
            { status: 400 }
          );
        }

        if (file.size / 1024 > maxSizeKB) {
          return NextResponse.json(
            { msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.` },
            { status: 400 }
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
    }

    const updatedData = {
      name,
      price,
      discount,
      description,
      category,
      slug,
      image: imagePaths,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Cập nhật Inventory
    const updatedInventories = JSON.parse(
      formData.get("currentInventories") as string
    );

    for (let i = 0; i < updatedInventories.length; i++) {
      const inv = updatedInventories[i];
      if (inv._id) {
        const exists = await Inventory.findOne({
          _id: { $ne: inv._id },
          product: id,
          size: inv.size,
          color: inv.color,
        });

        if (exists) {
          return NextResponse.json(
            { msg: `Sản phẩm này bị trùng size và màu.` },
            { status: 400 }
          );
        }

        await Inventory.findByIdAndUpdate(inv._id, {
          product: id,
          size: inv.size,
          color: inv.color,
          quantity: Number(inv.quantity),
        });
      }
    }

    // Thêm mới Inventory
    const newInventories = JSON.parse(formData.get("newInventories") as string);

    for (let i = 0; i < newInventories.length; i++) {
      const newInventory = newInventories[i];
      if (newInventory.size && newInventory.color) {
        const exists = await Inventory.findOne({
          product: id,
          size: newInventory.size,
          color: newInventory.color,
        });

        if (exists) {
          return NextResponse.json(
            { msg: `Sản phẩm này bị trùng size và màu.` },
            { status: 400 }
          );
        }

        await Inventory.create({
          product: id,
          size: newInventory.size,
          color: newInventory.color,
          quantity: Number(newInventory.quantity),
        });
      }
    }

    const hasProduct = await Product.exists({
      category: category,
      status: 1,
      _id: { $ne: id },
    });

    if (!hasProduct) {
      await Category.findByIdAndUpdate(category, { status: 0 });
    }

    return NextResponse.json({ product: updatedProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 400 });
  }
}
