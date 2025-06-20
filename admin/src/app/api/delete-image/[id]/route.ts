import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
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

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    if (product.image.length === 1) {
      return NextResponse.json(
        { msg: "Sản phẩm chỉ còn 1 hình không được xóa" },
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

    const deleteProduct = await Product.findByIdAndUpdate(
      id,
      { $pull: { image: image } }, // pull xóa hình là image trong mảng image
      { new: true }
    );

    return NextResponse.json({ product: deleteProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
