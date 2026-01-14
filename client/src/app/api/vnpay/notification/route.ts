import { connectMongoDB } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Order from "@/model/Order";
import Cart from "@/model/Cart";
import Coupon from "@/model/Coupon";
import Inventory from "@/model/Inventory";
import mongoose from "mongoose";
import Payment from "@/model/Payment";
export async function GET(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const vnp_Params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      vnp_Params[key] = value;
    });

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const orderCode = vnp_Params["vnp_TxnRef"];
    const responseCode = vnp_Params["vnp_ResponseCode"];
    const transId = vnp_Params["vnp_TransactionNo"];

    if (responseCode === "00") {
      const order = await Order.findOne({ orderCode: orderCode }).session(
        session
      );

      if (order) {
        let inventoryEnough = true;

        // Kiểm tra tồn kho
        for (const item of order.items) {
          const { product, color, size, quantity } = item;
          const inv = await Inventory.findOne({
            product,
            color,
            "inventories.size": size,
            "inventories.quantity": { $gte: quantity },
          }).session(session);

          if (!inv) {
            inventoryEnough = false;
            break;
          }
        }

        if (!inventoryEnough) {
          // Không đủ tồn, hoàn tiền
          // await refundPayment({ transId, amount: Number(amount), orderId });

          await Order.deleteOne({ _id: order._id }).session(session);
          await session.commitTransaction();
          session.endSession();
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}/order-result?result=fail`
          );
        }

        // Cập nhật tồn kho
        for (const item of order.items) {
          const { product, color, size, quantity } = item;
          await Inventory.updateOne(
            {
              product,
              color,
              inventories: {
                $elemMatch: { size, quantity: { $gte: quantity } },
              },
            },
            { $inc: { "inventories.$[elem].quantity": -quantity } },
            { arrayFilters: [{ "elem.size": size }], session }
          );
        }

        // Cập nhật coupon
        if (order.coupon) {
          await Coupon.findByIdAndUpdate(
            order.coupon,
            { $inc: { amount: -1 } },
            { session }
          );
        }

        // Xóa giỏ hàng
        await Cart.findOneAndDelete({ user: order.user }, { session });

        order.status = 0;
        await order.save({ session });

        // lưu giao dịch thành công
        await Payment.create({
          order: order._id,
          paymethod: order.paymethod,
          amount: order.total,
          transactionId: transId,
          status: 1,
        });

        await session.commitTransaction();
        session.endSession();
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}/order-result?result=successful`
        );
      }
    }

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/checkout`);
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
