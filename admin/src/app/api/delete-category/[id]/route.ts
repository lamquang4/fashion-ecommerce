import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    if (category.image) {
      const fileName = category.image.split("/uploads/category/")[1];
      const filePathAdmin = path.join(
        process.cwd(),
        `/public/uploads/category/${fileName}`
      );
      const filePathClient = path.join(
        process.cwd(),
        `../client/public/uploads/category/${fileName}`
      );

      await fs.rm(filePathAdmin, { force: true }).catch(() => {});
      await fs.rm(filePathClient, { force: true }).catch(() => {});
    }

    const deleteCategory = await Category.findByIdAndDelete(id);

    return NextResponse.json({ category: deleteCategory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
