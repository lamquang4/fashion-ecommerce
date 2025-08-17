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
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";

    const query: any = { role: { $in: [4, 5] } };
    if (q) {
      query.$or = [
        { fullname: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [customers, total] = await Promise.all([
      User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      User.countDocuments(query),
    ]);
    return NextResponse.json({
      customers,
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
