import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const limit = 10;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdAt: { $gte: startOfToday },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
