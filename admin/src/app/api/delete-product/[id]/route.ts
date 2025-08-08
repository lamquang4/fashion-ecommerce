import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import OrderDetail from "@/model/OrderDetail";
import Product from "@/model/Product";
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

    if (inventories) {
      for (const inventory of inventories) {
        for (const file of inventory.images) {
          const fileName = file.split("/uploads/product/")[1];
          const filePathAdmin = path.join(
            process.cwd(),
            `public/uploads/product/${fileName}`
          );
          const filePathClient = path.join(
            process.cwd(),
            `../client/public/uploads/product/${fileName}`
          );

          await fs.rm(filePathAdmin, { force: true }).catch(() => {});
          await fs.rm(filePathClient, { force: true }).catch(() => {});
        }
      }
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
