import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import OrderDetail from "@/model/OrderDetail";
import Product from "@/model/Product";
import { extractPublicId } from "@/utils/extractPublicId";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
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

    const checkProduct = await OrderDetail.findOne({ "buy.product": id });
    if (checkProduct) {
      return NextResponse.json(
        {
          msg: "Sản phẩm này đã được mua trong đơn hàng nên không thể xóa!",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const inventories = await Inventory.find({ product: id });

    if (inventories.length > 0) {
      const allImages = inventories.flatMap((inv) => inv.images);

      const publicIds = allImages
        .map((img) => extractPublicId(img))
        .filter(Boolean) as string[];

      await Promise.all(
        publicIds.map((pid) => cloudinary.uploader.destroy(pid))
      );
    }

    const deleteProduct = await Product.findByIdAndDelete(id);
    await Inventory.deleteMany({ product: id });

    return NextResponse.json({ product: deleteProduct }, { status: 201 });
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
