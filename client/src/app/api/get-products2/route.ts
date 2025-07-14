import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const skip = (page - 1) * limit;
    const keyword = searchParams.get("keyword") || "";

    const query: any = {
      status: 1,
    };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    const [products, productsBestSeller, total] = await Promise.all([
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
      Product.aggregate([
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

    const resultProducts = products.length > 0 ? products : productsBestSeller;

    return NextResponse.json({
      products: resultProducts,
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
