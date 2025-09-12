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

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy" },
        { status: 404 }
      );
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
