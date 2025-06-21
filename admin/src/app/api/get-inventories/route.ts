import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Inventory.find()
        .populate("product", "name image")
        .populate("size", "namesize")
        .populate("color", "namecolor codecolor")
        .sort({ product: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Inventory.countDocuments(),
    ]);
    return NextResponse.json({
      inventories: data,
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
