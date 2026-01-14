import { connectMongoDB } from "@/lib/MongoConnect";
import Payment from "@/model/Payment";
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
    const query: any = {};

    if (status) {
      query.status = parseInt(status);
    }

    const pipeline: any[] = [
      { $match: query },
      {
        $lookup: {
          from: "orders",
          localField: "order",
          foreignField: "_id",
          as: "order",
          pipeline: [{ $project: { orderCode: 1 } }],
        },
      },
      { $unwind: "$order" },
    ];

    if (q) {
      pipeline.push({
        $match: {
          "order.orderCode": { $regex: q, $options: "i" },
        },
      });
    }
    pipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          paymethod: 1,
          amount: 1,
          transactionId: 1,
          status: 1,
          createdAt: 1,
          order: {
            _id: "$order._id",
            orderCode: "$order.orderCode",
          },
        },
      }
    );

    const [payments, totalResult] = await Promise.all([
      Payment.aggregate([
        ...pipeline,
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      Payment.aggregate([...pipeline, { $count: "total" }]),
    ]);

    if (!payments || payments.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 404 }
      );
    }

    const total = totalResult[0]?.total || 0;

    return NextResponse.json(
      {
        payments,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
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
