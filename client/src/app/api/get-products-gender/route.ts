import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const limit = 12;
    const productsGender = async (gender: number) => {
      return Product.aggregate([
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
        { $match: { "category.gender": gender } },
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
        { $limit: limit },
      ]);
    };

    const [productsMale, productsFemale] = await Promise.all([
      productsGender(1),
      productsGender(0),
    ]);

    return NextResponse.json({
      productsMale,
      productsFemale,
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
