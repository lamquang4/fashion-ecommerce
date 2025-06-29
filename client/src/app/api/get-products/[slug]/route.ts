import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const keyword = searchParams.get("keyword") || "";

    const category = await Category.findOne({ slug, status: 1 }).select("_id");

    if (!category) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy category",
        },
        {
          status: 400,
        }
      );
    }

    const query: any = {
      status: 1,
      category: category._id,
    };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    const [products, countResult] = await Promise.all([
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
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "inventories",
            let: { productId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$product", "$$productId"] } } },
              { $sort: { _id: 1 } },
              {
                $group: {
                  _id: "$color",
                  doc: { $first: "$$ROOT" },
                },
              },
              { $replaceRoot: { newRoot: "$doc" } },
              {
                $lookup: {
                  from: "colors",
                  localField: "color",
                  foreignField: "_id",
                  as: "colorDetails",
                },
              },
              {
                $unwind: {
                  path: "$colorDetails",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $addFields: {
                  color: {
                    _id: "$color",
                    namecolor: "$colorDetails.namecolor",
                    codecolor: "$colorDetails.codecolor",
                  },
                },
              },
              { $project: { colorDetails: 0 } },
            ],
            as: "inventory",
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]),
      Product.aggregate([{ $match: query }, { $count: "total" }]),
    ]);

    const total = countResult[0]?.total || 0;
    return NextResponse.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
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
