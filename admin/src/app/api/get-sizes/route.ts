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
    const q = searchParams.get("q") || "";

    const query: any = {};
    if (q) {
      query.$or = [{ namesize: { $regex: q, $options: "i" } }];
    }

    const [sizes, total] = await Promise.all([
      Size.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Size.countDocuments(query),
    ]);

    if (!sizes || sizes.length === 0) {
      return NextResponse.json(
        {
          sizes: [],
          total: 0,
          page,
          limit,
          totalPages: 0,
          msg: "Không tìm thấy kích thước",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        sizes,
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
