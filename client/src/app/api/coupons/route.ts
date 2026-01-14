import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    const coupons = await Coupon.aggregate([
      {
        $match: {
          status: 1,
          amount: { $gt: 0 },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "coupon",
          as: "usedOrders",
        },
      },
      {
        $addFields: {
          userUsedCount: {
            $size: {
              $filter: {
                input: "$usedOrders",
                as: "order",
                cond: {
                  $eq: ["$$order.user", new mongoose.Types.ObjectId(userId)],
                },
              },
            },
          },
        },
      },
      {
        $match: {
          $expr: { $lt: ["$userUsedCount", "$limit"] },
        },
      },
      {
        $project: {
          usedOrders: 0,
        },
      },
    ]);

    if (!coupons || coupons.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy phiếu giảm giá" },
        { status: 404 }
      );
    }

    return NextResponse.json({ coupons }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}
