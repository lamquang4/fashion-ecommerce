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
    const keyword = searchParams.get("keyword") || "";
    // tìm kiếm keyword (name) của Product ngoài Inventory
    const inventories = await Inventory.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "sizes",
          localField: "size",
          foreignField: "_id",
          as: "size",
        },
      },
      { $unwind: "$size" },
      {
        $lookup: {
          from: "colors",
          localField: "color",
          foreignField: "_id",
          as: "color",
        },
      },
      { $unwind: "$color" },
      {
        $match: keyword
          ? { "product.name": { $regex: keyword, $options: "i" } }
          : {},
      },
      { $sort: { "product.name": 1, createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const total = await Inventory.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $match: keyword
          ? { "product.name": { $regex: keyword, $options: "i" } }
          : {},
      },
      {
        $count: "total",
      },
    ]);

    return NextResponse.json({
      inventories,
      total: total[0]?.total || 0,
      page,
      limit,
      totalPages: Math.ceil((total[0]?.total || 0) / limit),
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
