import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    // lấy các sản phẩm tìm kiếm name sản phẩm
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const skip = (page - 1) * limit;
    const keyword = searchParams.get("keyword") || "";

    const min = parseInt(searchParams.get("min") || "");
    const max = parseInt(searchParams.get("max") || "");
    const colors = searchParams.getAll("color");
    const sort = searchParams.get("sort") || "";

    const query: any = {
      status: 1,
      name: { $regex: keyword, $options: "i" },
    };

    const pipeline: any[] = [
      { $match: query },
      {
        $addFields: {
          finalPrice: { $subtract: ["$price", "$discount"] },
        },
      },
    ];

    if (!isNaN(min) || !isNaN(max)) {
      const conditions = [];
      if (!isNaN(min)) conditions.push({ $gte: ["$finalPrice", min] });
      if (!isNaN(max)) conditions.push({ $lte: ["$finalPrice", max] });

      pipeline.push({
        $match: { $expr: { $and: conditions } },
      });
    }

    pipeline.push(
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
      }
    );

    if (colors.length > 0) {
      pipeline.push({
        $match: {
          "variants.color.namecolor": { $in: colors },
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
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    const countPipeline = [...pipeline, { $count: "total" }];

    pipeline.push({ $skip: skip }, { $limit: limit });

    const [products, totalCount] = await Promise.all([
      Product.aggregate(pipeline),
      Product.aggregate(countPipeline),
    ]);

    const total = totalCount[0]?.total || 0;

    return NextResponse.json({
      products: products,
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
