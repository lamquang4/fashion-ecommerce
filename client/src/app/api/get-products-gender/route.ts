import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const [productsMale, productsFemale] = await Promise.all([
      Product.aggregate([
        { $match: { status: 1 } },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        { $match: { "category.gender": 1 } },
        {
          $lookup: {
            from: "inventories",
            let: { productId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$product", "$$productId"] } } },
              {
                $group: {
                  _id: "$color",
                },
              },
              {
                $lookup: {
                  from: "colors",
                  localField: "_id",
                  foreignField: "_id",
                  as: "color",
                },
              },
              { $unwind: "$color" },
              {
                $replaceRoot: { newRoot: "$color" },
              },
            ],
            as: "colors",
          },
        },
        { $limit: 10 },
        { $sort: { createdAt: -1 } },
      ]),
      Product.aggregate([
        { $match: { status: 1 } },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        { $match: { "category.gender": 0 } },
        {
          $lookup: {
            from: "inventories",
            let: { productId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$product", "$$productId"] } } },
              {
                $group: {
                  _id: "$color",
                },
              },
              {
                $lookup: {
                  from: "colors",
                  localField: "_id",
                  foreignField: "_id",
                  as: "color",
                },
              },
              { $unwind: "$color" },
              {
                $replaceRoot: { newRoot: "$color" },
              },
            ],
            as: "colors",
          },
        },
        { $limit: 10 },
      ]),
    ]);

    return NextResponse.json({
      productsMale,
      productsFemale,
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
