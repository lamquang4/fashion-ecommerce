import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
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
      query.$or = [{ namesize: { $regex: keyword, $options: "i" } }];
    }

    const [data, total] = await Promise.all([
      Size.find(query).skip(skip).limit(limit),
      Size.countDocuments(query),
    ]);
    return NextResponse.json({
      sizes: data,
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
