import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import OrderDetail from "@/model/OrderDetail";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
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

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json(
        { msg: "Không tìm thấy tồn kho" },
        { status: 404 }
      );
    }

    const checkInventory = await OrderDetail.findOne({
      buy: {
        $elemMatch: {
          product: inventory.product,
          size: inventory.size,
          color: inventory.color,
        },
      },
    });

    if (checkInventory) {
      return NextResponse.json(
        {
          msg: "Tồn kho này đã được mua trong đơn hàng nên không thể xóa!",
        },
        { status: 400 }
      );
    }

    const checkCount = await Inventory.find({
      product: { $in: inventory.product },
    });
    if (checkCount.length === 1) {
      return NextResponse.json(
        { msg: "Không thể xóa vì sản phẩm chỉ còn 1 tồn kho." },
        { status: 404 }
      );
    }

    const deleteInventory = await Inventory.findByIdAndDelete(id);

    return NextResponse.json({ Inventory: deleteInventory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
