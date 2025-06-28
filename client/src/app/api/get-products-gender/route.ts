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
                $sort: { _id: 1 },
              },
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
        { $limit: 10 },
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
                $sort: { _id: 1 },
              },
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
