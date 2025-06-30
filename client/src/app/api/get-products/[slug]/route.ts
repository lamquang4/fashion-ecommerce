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
    const { slug } = params;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const keyword = searchParams.get("keyword") || "";

    let categoryQuery: any = { status: 1 };
    let categoryIds: any[] = [];

    if (slug === "nam") {
      categoryQuery.gender = 1;
    } else if (slug === "nu") {
      categoryQuery.gender = 0;
    } else {
      categoryQuery.slug = slug;
    }

    const categories = await Category.find(categoryQuery).select("_id");

    if (!categories) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục" },
        { status: 400 }
      );
    }

    categoryIds = categories.map((cat) => cat._id);

    const query: any = {
      status: 1,
      category: { $in: categoryIds },
    };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
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
      Product.countDocuments(query),
    ]);

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
