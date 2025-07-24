import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import Product from "@/model/Product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
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

    const hasProduct = await Product.exists({ category: id, status: 1 });

    if (status === 1 && !hasProduct) {
      return NextResponse.json(
        {
          msg: "Danh mục chưa có sản phẩm nào đang là hiện nên không thể hiện",
        },
        { status: 400 }
      );
    }

    /*
    if (status === 0 && category.status === 1 && hasProduct) {
      return NextResponse.json(
        { msg: "Danh mục đã có sản phẩm đang hiện nên không thể ẩn" },
        { status: 400 }
      );
    }
      */

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    return NextResponse.json({ category: updatedCategory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
