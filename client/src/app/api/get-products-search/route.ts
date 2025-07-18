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

    const min = parseFloat(searchParams.get("min") || "0");
    const max = parseFloat(searchParams.get("max") || "1000000000");
    const sort = searchParams.get("sort") || "";

    if (!keyword) {
      return NextResponse.json({
        products: [],
        total: 0,
        totalPages: 0,
        page,
      });
    }

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

    if (sort === "price-asc") {
      pipeline.push({ $sort: { finalPrice: 1 } });
    } else if (sort === "price-desc") {
      pipeline.push({ $sort: { finalPrice: -1 } });
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
