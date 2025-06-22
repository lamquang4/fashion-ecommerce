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
    const keyword = searchParams.get("keyword") || "";
    const query: any = {};
    if (keyword) {
      query.$or = [
        { namecolor: { $regex: keyword, $options: "i" } },
        { codecolor: { $regex: keyword, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      Color.find(query).skip(skip).limit(limit),
      Color.countDocuments(query),
    ]);
    return NextResponse.json({
      colors: data,
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
