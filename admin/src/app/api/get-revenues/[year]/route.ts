import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import OrderDetail from "@/model/OrderDetail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { year: string } }
) {
  try {
    await connectMongoDB();
    const year = await parseInt(params.year);

    const revenues = await Order.aggregate([
      {
        $match: {
          status: 3,
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00.000Z`),
            $lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
          },
        },
      },
      {
        $lookup: {
          from: "orderdetails",
          localField: "_id",
          foreignField: "order",
          as: "details",
        },
      },
      { $unwind: "$details" },
      { $unwind: "$details.items" },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$total" },
          totalQuantity: { $sum: "$details.items.quantity" },
        },
      },
      {
        $project: {
          month: "$_id",
          totalRevenue: 1,
          totalQuantity: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    return NextResponse.json({ revenues });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 400 });
  }
}
