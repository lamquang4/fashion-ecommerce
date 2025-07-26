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
    const start = searchParams.get("start");
    const end = searchParams.get("end");
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
    if (start && end) {
      query.createdAt = {
        $gte: new Date(start),
        $lte: new Date(`${end}T23:59:59.999Z`),
      };
    }

    const [
      orders,
      total,
      totalStatus0,
      totalStatus3,
      totalStatus4,
      totalRevenue,
      totalSold,
    ] = await Promise.all([
      Order.find(query).skip(skip).limit(limit),
      Order.countDocuments(query),
      Order.countDocuments({ status: 0 }),
      Order.countDocuments({ status: 3 }),
      Order.countDocuments({ status: 4 }),
      Order.aggregate([
        { $match: { status: 3 } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      OrderDetail.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "order",
            foreignField: "_id",
            as: "orderInfo",
          },
        },
        { $unwind: "$orderInfo" },
        { $match: { "orderInfo.status": 3 } },
        { $unwind: "$items" },
        {
          $group: {
            _id: null,
            total1: { $sum: "$items.quantity" },
          },
        },
      ]),
    ]);

    return NextResponse.json({
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalStatus0,
      totalStatus3,
      totalStatus4,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalSold: totalSold[0]?.total1 || 0,
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
