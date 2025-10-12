import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
import Order from "@/model/Order";
import Cart from "@/model/Cart";
import Coupon from "@/model/Coupon";
import Inventory from "@/model/Inventory";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectMongoDB();

    const { searchParams } = req.nextUrl;
    const orderId = searchParams.get("orderId");
    const resultCode = searchParams.get("resultCode");

    if (resultCode === "0") {
      const order = await Order.findById(orderId).session(session);

      if (order) {
        order.status = 0;
        await order.save({ session });

        for (const item of order.items) {
          const { product, color, size, quantity } = item;

          const updated = await Inventory.updateOne(
            {
              product,
              color,
              inventories: {
                $elemMatch: { size, quantity: { $gte: quantity } },
              },
            },
            {
              $inc: { "inventories.$[elem].quantity": -quantity },
            },
            {
              arrayFilters: [{ "elem.size": size }],
              session,
            }
          );

          if (updated.modifiedCount === 0) {
            throw new Error("Sản phẩm không đủ tồn kho.");
          }
        }

        if (order.coupon) {
          await Coupon.findByIdAndUpdate(
            order.coupon,
            { $inc: { amount: -1 } },
            { session }
          );
        }

        await Cart.findOneAndDelete({ user: order.user }, { session });
      }

      await session.commitTransaction();
      session.endSession();
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);

    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ msg: "Lỗi", err }, { status: 500 });
  }
}
