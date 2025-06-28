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
    const query: any = {};

    // tìm kiếm keyword (name) của Product ngoài Inventory
    const [inventories, countResult, countQuantity] = await Promise.all([
      Inventory.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        ...(keyword
          ? [
              {
                $match: {
                  "product.name": { $regex: keyword, $options: "i" },
                },
              },
            ]
          : []),
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
        { $skip: skip },
        { $limit: limit },
      ]),
      Inventory.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        ...(keyword
          ? [
              {
                $match: {
                  "product.name": { $regex: keyword, $options: "i" },
                },
              },
            ]
          : []),
        {
          $count: "total",
        },
      ]),
      Inventory.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        ...(keyword
          ? [
              {
                $match: {
                  "product.name": { $regex: keyword, $options: "i" },
                },
              },
            ]
          : []),
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: "$quantity" },
          },
        },
      ]),
    ]);

    const total = countResult[0]?.total || 0;
    const totalQuantity = countQuantity[0]?.totalQuantity || 0;
    return NextResponse.json({
      inventories,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalQuantity,
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
