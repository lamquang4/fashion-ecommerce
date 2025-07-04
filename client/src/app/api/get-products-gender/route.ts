import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

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
              { $replaceRoot: { newRoot: "$color" } },
            ],
            as: "colors",
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 12 },
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
    console.log(err);
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
