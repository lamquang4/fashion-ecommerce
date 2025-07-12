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
    const limit = 12;
    const skip = (page - 1) * limit;

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
        { $unwind: "$category" },
        {
          $lookup: {
            from: "inventories",
            let: { productId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$product", "$$productId"] },
                },
              },
              {
                $lookup: {
                  from: "colors",
                  localField: "color",
                  foreignField: "_id",
                  as: "color",
                },
              },
              { $unwind: "$color" },
              { $unwind: "$inventories" },
              {
                $lookup: {
                  from: "sizes",
                  localField: "inventories.size",
                  foreignField: "_id",
                  as: "inventories.size",
                },
              },
              {
                $unwind: "$inventories.size",
              },
              {
                $group: {
                  _id: "$_id",
                  product: { $first: "$product" },
                  images: { $first: "$images" },
                  color: { $first: "$color" },
                  inventories: {
                    $push: {
                      size: "$inventories.size",
                      quantity: "$inventories.quantity",
                    },
                  },
                },
              },
              { $sort: { _id: 1 } },
            ],
            as: "variants",
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
