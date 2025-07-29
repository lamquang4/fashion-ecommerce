import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "";
    const type = searchParams.get("type") || "";
    const skip = (page - 1) * limit;
    const query: any = { type: { $in: [0, 1] } };
    if (status) {
      query.status = parseInt(status);
    }
    if (type) {
      query.type = parseInt(type);
    }

    const [data, total] = await Promise.all([
      Banner.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Banner.countDocuments(query),
    ]);
    return NextResponse.json({
      mainbanners: data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
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
