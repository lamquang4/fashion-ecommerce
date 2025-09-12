import { connectMongoDB } from "@/lib/MongoConnect";
import Color from "@/model/Color";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";
    const query: any = {};
    if (q) {
      query.$or = [
        { namecolor: { $regex: q, $options: "i" } },
        { codecolor: { $regex: q, $options: "i" } },
      ];
    }

    const [colors, total] = await Promise.all([
      Color.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Color.countDocuments(query),
    ]);

    if (!colors || colors.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        colors,
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
