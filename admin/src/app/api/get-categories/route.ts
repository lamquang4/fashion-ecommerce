import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
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
    const query: any = {};
    if (q) {
      query.namecategory = { $regex: q, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [categories, total] = await Promise.all([
      Category.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "products",
          },
        },
        {
          $addFields: {
            totalProduct: { $size: "$products" },
          },
        },
        {
          $lookup: {
            from: "products",
            let: { categoryId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$category", "$$categoryId"] },
                      { $eq: ["$status", 1] },
                    ],
                  },
                },
              },
            ],
            as: "products",
          },
        },
        {
          $addFields: {
            totalProductActive: { $size: "$products" },
          },
        },
        {
          $project: {
            products: 0, // không lấy products
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        { $skip: skip },
        { $limit: limit },
      ]),
      Category.countDocuments(query),
    ]);

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        {
          categories: [],
          total: 0,
          page,
          limit,
          totalPages: 0,
          msg: "Không tìm thấy danh mục",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        categories,
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
