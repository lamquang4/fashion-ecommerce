import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
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
    const query: any = { role: { $in: [0, 1, 2] } };
    if (keyword) {
      query.$or = [
        { fullname: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ];
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [data, total] = await Promise.all([
      User.find(query).skip(skip).limit(limit),
      User.countDocuments(query),
    ]);
    return NextResponse.json({
      admins: data,
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
