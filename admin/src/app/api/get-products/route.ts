import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search")?.trim() as string;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const [data, total] = await Promise.all([
      Product.find(query)
        .populate("category", "namecategory gender")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(),
    ]);

    return NextResponse.json({
      products: data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Something was wrong" },
      {
        status: 400,
      }
    );
  }
}
