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

    const [
      orders,
      total,
      totalStatus0,
      totalStatus3,
      totalStatus4,
    ] = await Promise.all([
      Order.find(query).skip(skip).limit(limit),
      Order.countDocuments(query),
      Order.countDocuments({ status: 0 }),
      Order.countDocuments({ status: 3 }),
      Order.countDocuments({ status: 4 }),
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
