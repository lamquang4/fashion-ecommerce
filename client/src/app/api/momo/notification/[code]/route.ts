import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
import Order from "@/model/Order";
import Cart from "@/model/Cart";
import Coupon from "@/model/Coupon";
import Inventory from "@/model/Inventory";
import mongoose from "mongoose";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectMongoDB();

    const { code } = await params;

    const partnerCode = process.env.MOMO_PARTNERCODE;
    const accessKey = process.env.MOMO_ACCESSKEY;
    const secretKey = process.env.MOMO_SECRETKEY;
    const requestId = code;

    const rawSignature = `accessKey=${accessKey}&orderId=${code}&partnerCode=${partnerCode}&requestId=${requestId}`;

    const signature = crypto
      .createHmac("sha256", secretKey!)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      requestId,
      orderId: code,
      signature,
      lang: "vi",
    };

    const response = await axios.post(
      `${process.env.MOMO_URL}/query`,
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.resultCode === 0) {
      const order = await Order.findOne({ orderCode: code }).session(session);

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
      } else {
        await Order.deleteOne({ orderCode: code }, { session });
      }

      await session.commitTransaction();
      session.endSession();
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.log(err);

    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ msg: "Lỗi", err }, { status: 500 });
  }
}
