import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import Order from "@/model/Order";
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

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { msg: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    // hủy đơn hàng
    if (status === 4) {
      for (const item of order.items) {
        const { product, color, size, quantity } = item;

        const inventory = await Inventory.findOne({
          product,
          color,
        });

        if (!inventory) continue;

        const sizeInventory = inventory.inventories.find((inv: any) =>
          inv.size.equals(size)
        );

        if (sizeInventory) {
          sizeInventory.quantity += quantity;
        }

        await inventory.save();
      }
    }

    await Order.findByIdAndUpdate(id, { status }, { new: true });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
