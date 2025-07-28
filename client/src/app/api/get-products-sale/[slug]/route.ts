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

    //lấy những sp có giảm giá theo giới tính

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const skip = (page - 1) * limit;

    const min = parseInt(searchParams.get("min") || "");
    const max = parseInt(searchParams.get("max") || "");
    const colors = searchParams.getAll("color");
    const sort = searchParams.get("sort");

    let categoryQuery: any = { status: 1 };
    let categoryIds: any[] = [];

    if (slug === "nam") {
      categoryQuery.gender = 1;
    } else if (slug === "nu") {
      categoryQuery.gender = 0;
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
      discount: { $gt: 0 },
      category: { $in: categoryIds },
    };

    const pipeline: any[] = [
      { $match: query },
      {
        $addFields: {
          finalPrice: { $subtract: ["$price", "$discount"] },
        },
      },
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
            { $unwind: "$inventories.size" },
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
    ];

    if (!isNaN(min) && !isNaN(max)) {
      pipeline.push({
        $match: {
          $expr: {
            $and: [
              { $gte: ["$finalPrice", min] },
              { $lte: ["$finalPrice", max] },
            ],
          },
        },
      });
    } else if (!isNaN(min)) {
      pipeline.push({
        $match: {
          $expr: {
            $gte: ["$finalPrice", min],
          },
        },
      });
    } else if (!isNaN(max)) {
      pipeline.push({
        $match: {
          $expr: {
            $lte: ["$finalPrice", max],
          },
        },
      });
    }

    if (sort === "price-asc") {
      pipeline.push({ $sort: { finalPrice: 1 } });
    } else if (sort === "price-desc") {
      pipeline.push({ $sort: { finalPrice: -1 } });
    } else if (sort === "bestseller") {
      pipeline.push(
        {
          $lookup: {
            from: "orderdetails",
            let: { productId: "$_id" },
            pipeline: [
              {
                $unwind: "$items",
              },
              {
                $match: {
                  $expr: { $eq: ["$items.product", "$$productId"] },
                },
              },
              {
                $lookup: {
                  from: "orders",
                  localField: "order",
                  foreignField: "_id",
                  as: "order",
                },
              },
              {
                $unwind: "$order",
              },
              {
                $match: {
                  "order.status": 3,
                },
              },
              {
                $group: {
                  _id: "$items.product",
                  totalSold: { $sum: "$items.quantity" },
                },
              },
            ],
            as: "sold",
          },
        },
        {
          $addFields: {
            totalSold: {
              $ifNull: [{ $arrayElemAt: ["$sold.totalSold", 0] }, 0],
            },
          },
        },
        {
          $match: {
            totalSold: { $gt: 0 },
          },
        },
        {
          $sort: {
            totalSold: -1,
          },
        },
        {
          $project: {
            sold: 0,
          },
        }
      );
    }

    if (colors.length > 0) {
      pipeline.push({
        $match: {
          "variants.color.namecolor": { $in: colors },
        },
      });
    }

    pipeline.push({ $skip: skip }, { $limit: limit });

    const [products, total] = await Promise.all([
      Product.aggregate(pipeline),
      Product.aggregate([
        { $match: query },
        {
          $addFields: {
            finalPrice: { $subtract: ["$price", "$discount"] },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                { $gte: ["$finalPrice", min] },
                { $lte: ["$finalPrice", max] },
              ],
            },
          },
        },
        { $count: "total" },
      ]).then((res) => res[0]?.total || 0),
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
