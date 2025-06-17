import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();

    const { id, status } = body;

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

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    return NextResponse.json({ Product: updatedProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
