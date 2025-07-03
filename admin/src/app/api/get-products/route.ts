import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
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
      query.name = { $regex: keyword, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [products, total] = await Promise.all([
      Product.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "inventories",
            localField: "_id",
            foreignField: "product",
            as: "inventory",
          },
        },
        {
          $addFields: {
            totalQuantity: { $sum: "$inventory.quantity" },
          },
        },
        { $unwind: "$category" },
        { $skip: skip },
        { $limit: limit },
        { $sort: { createdAt: -1 } },
      ]),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
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
