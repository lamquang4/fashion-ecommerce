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

    const [mainbanners, total] = await Promise.all([
      Banner.find(query).skip(skip).limit(limit).lean(),
      Banner.countDocuments(query),
    ]);

    if (!mainbanners || mainbanners.length === 0) {
      return NextResponse.json(
        {
          mainbanners: [],
          total: 0,
          page,
          limit,
          totalPages: 0,
          msg: "Không tìm thấy",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        mainbanners,
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
