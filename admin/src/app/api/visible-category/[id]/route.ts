import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import Product from "@/model/Product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const body = await req.json();

    const { status } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { msg: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    // kiểm tra danh mục có chứa sản phẩm nào (không tính status)
    const hasProduct = await Product.exists({ category: id });

    if (!hasProduct && status !== 0) {
      return NextResponse.json(
        {
          msg: "Danh mục chưa có sản phẩm nào!",
        },
        { status: 404 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    return NextResponse.json({ category: updatedCategory }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
