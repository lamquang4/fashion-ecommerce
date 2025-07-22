import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ msg: "Chưa đăng nhập" }, { status: 401 });
    }

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

    return NextResponse.json({ coupons });
  } catch (err) {
    console.error("Error fetching coupons:", err);
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 400 });
  }
}
