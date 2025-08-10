import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import Product from "@/model/Product";
import { extractPublicId } from "@/utils/extractPublicId";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }
    const checkCategory = await Product.findOne({ category: id });
    if (checkCategory) {
      return NextResponse.json(
        {
          msg: "Danh mục này đẫ được sử dụng cho sản phẩm nên không được xóa!",
        },
        {
          status: 404,
        }
      );
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    if (category.image) {
      const publicId = extractPublicId(category.image);
      await cloudinary.uploader.destroy(publicId);
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
