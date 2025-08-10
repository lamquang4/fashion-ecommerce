import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import {  NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const limit = 12;

    const productsBestseller = await Product.aggregate([
      { $match: { status: 1 } },
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
      },
      {
        $limit: limit,
      },
    ]);

    return NextResponse.json({
      productsBestseller,
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
