import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import OrderDetail from "@/model/OrderDetail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const keyword = searchParams.get("keyword") || "";
    const status = searchParams.get("status") || "";
    const query: any = {};
    if (keyword) {
      query.orderCode = { $regex: keyword, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }

    const successfulOrders = await Order.find({ status: 3 }).select("_id");
    const successfulOrderIds = successfulOrders.map((order) => order._id);

    const [
      orders,
      total,
      totalRevenue,
      totalSold,
      totalStatus0,
      totalStatus3,
      totalStatus4,
    ] = await Promise.all([
      Order.find(query).skip(skip).limit(limit),
      Order.countDocuments(query),
      Order.aggregate([
        { $match: { status: 3 } },
        { $group: { _id: null, totalSum: { $sum: "$total" } } },
      ]),
      OrderDetail.aggregate([
        {
          $match: {
            order: { $in: successfulOrderIds },
          },
        },
        { $unwind: "$buy" },
        {
          $addFields: {
            totalSum: { $sum: "$buy.quantity" },
          },
        },
        { $sort: { createdAt: -1 } },
      ]),
      Order.countDocuments({ status: 0 }),
      Order.countDocuments({ status: 3 }),
      Order.countDocuments({ status: 4 }),
    ]);
    const revenue = totalRevenue[0]?.totalSum || 0;
    const sold = totalSold[0]?.totalSold || 0;
    return NextResponse.json({
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRevenue: revenue,
      totalSold: sold,
      totalStatus0,
      totalStatus3,
      totalStatus4,
    });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
