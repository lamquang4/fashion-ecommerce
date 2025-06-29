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
    const keyword = searchParams.get("keyword") || "";
    const status = searchParams.get("status") || "";
    const query: any = {};
    if (keyword) {
      query.namecategory = { $regex: keyword, $options: "i" };
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
            productCount: { $size: "$products" },
          },
        },
        {
          $project: {
            products: 0,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]),
      Category.countDocuments(query),
    ]);
    return NextResponse.json({
      categories,
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
