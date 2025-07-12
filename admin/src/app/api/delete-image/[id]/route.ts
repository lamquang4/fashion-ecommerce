import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const searchParams = req.nextUrl.searchParams;
    const image = searchParams.get("image") as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json(
        { msg: "Không tìm thấy" },
        { status: 404 }
      );
    }

    if (inventory.images.length === 1) {
      return NextResponse.json(
        { msg: "Hình sản phẩm của biến thể này chỉ còn 1 nên không được xóa!" },
        { status: 404 }
      );
    }

    const fileName = image.split("/uploads/product/")[1];
    const filePathAdmin = path.join(
      process.cwd(),
      `/public/uploads/product/${fileName}`
    );
    const filePathClient = path.join(
      process.cwd(),
      `../client/public/uploads/product/${fileName}`
    );

    await fs.rm(filePathAdmin, { force: true }).catch(() => {});
    await fs.rm(filePathClient, { force: true }).catch(() => {});

    const deleteImage = await Inventory.findByIdAndUpdate(
      id,
      { $pull: { images: image } }, // pull xóa hình là image trong mảng image
      { new: true }
    );

    return NextResponse.json({ inventory: deleteImage }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
