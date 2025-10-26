import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";
    const start = searchParams.get("start") || "";
    const end = searchParams.get("end") || "";

    const query: any = {};
    if (q) {
      query.orderCode = { $regex: q, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }
    if (start || end) {
      query.createdAt = {};

      if (start) {
        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0); // đầu ngày
        query.createdAt.$gte = startDate;
      }

      if (end) {
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999); // cuối ngày
        query.createdAt.$lte = endDate;
      }
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
      Order.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Order.countDocuments(query),
      Order.countDocuments({ status: 0 }),
      Order.countDocuments({ status: 3 }),
      Order.countDocuments({ status: 4 }),
      Order.aggregate([
        { $match: { status: 3 } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Order.aggregate([
        { $match: { status: 3 } },
        { $unwind: "$items" },
        {
          $group: {
            _id: null,
            totalSold: { $sum: "$items.quantity" },
          },
        },
      ]),
    ]);

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        orders,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalStatus0,
        totalStatus3,
        totalStatus4,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalSold: totalSold[0]?.totalSold || 0,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
