import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextResponse } from "next/server";

export async function GET() {
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
                  color: {
                    $first: {
                      _id: "$color._id",
                      namecolor: "$color.namecolor",
                      codecolor: "$color.codecolor",
                    },
                  },
                  inventories: {
                    $push: {
                      size: {
                        _id: "$inventories.size._id",
                        namesize: "$inventories.size.namesize",
                      },
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
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            discount: 1,
            description: 1,
            slug: 1,
            status: 1,
            createdAt: 1,
            category: {
              _id: "$category._id",
              namecategory: "$category.namecategory",
              gender: "$category.gender",
            },
            variants: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        { $limit: limit },
      ]);
    };

    const results = await Promise.allSettled([
      productsGender(1),
      productsGender(0),
    ]);

    const productsMale =
      results[0].status === "fulfilled" ? results[0].value : [];
    const productsFemale =
      results[1].status === "fulfilled" ? results[1].value : [];
    return NextResponse.json(
      {
        productsMale,
        productsFemale,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
