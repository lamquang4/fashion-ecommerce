import { connectMongoDB } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Order from "@/model/Order";
import Cart from "@/model/Cart";
import Coupon from "@/model/Coupon";
import Inventory from "@/model/Inventory";
import mongoose from "mongoose";
import crypto from "crypto";
import axios from "axios";
export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectMongoDB();

    const { total, orderCode } = await req.json();

    const partnerCode = process.env.MOMO_PARTNERCODE;
    const accessKey = process.env.MOMO_ACCESSKEY;
    const secretKey = process.env.MOMO_SECRETKEY;
    const requestId = orderCode;
    const orderId = requestId;
    const orderInfo = "Thanh toán bằng Momo"; // nội dung giao dịch
    const redirectUrl = `${process.env.NEXTAUTH_URL}`;
    const ipnUrl = `${process.env.NEXTAUTH_URL}`;
    const amount = total;
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    const signature = crypto
      .createHmac("sha256", secretKey!)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });

    const response = await axios.post(
      `${process.env.MOMO_URL}/create`, // https://payment.momo.vn
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.resultCode === 0) {
      const order = await Order.findOne({ orderCode: orderId }).session(
        session
      );

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

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
