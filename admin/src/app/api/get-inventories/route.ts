import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";

    // tìm kiếm tên sản phẩm lấy trong Product
    const [inventories, countTotal, countQuantity] = await Promise.all([
      Inventory.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        ...(q
          ? [
              {
                $match: {
                  "product.name": { $regex: q, $options: "i" },
                },
              },
            ]
          : []),
        {
          $unwind: "$inventories",
        },
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
            createdAt: { $first: "$createdAt" },
            inventories: {
              $push: "$inventories",
            },
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
        {
          $unwind: "$color",
        },
        {
          $project: {
            _id: 1,
            "product._id": 1,
            "product.name": 1,
            images: 1,
            "color._id": 1,
            "color.namecolor": 1,
            "color.codecolor": 1,
            inventories: {
              size: {
                _id: 1,
                namesize: 1,
              },
              quantity: 1,
            },
            createdAt: 1,
          },
        },

        { $sort: { "product._id": 1, color: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      Inventory.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        ...(q
          ? [
              {
                $match: {
                  "product.name": { $regex: q, $options: "i" },
                },
              },
            ]
          : []),
        {
          $project: {
            inventoriesCount: { $size: "$inventories" },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$inventoriesCount" },
          },
        },
      ]),
      Inventory.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        ...(q
          ? [
              {
                $match: {
                  "product.name": { $regex: q, $options: "i" },
                },
              },
            ]
          : []),
        { $unwind: "$inventories" },
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: "$inventories.quantity" },
          },
        },
      ]),
    ]);

    const total = countTotal[0]?.total || 0;
    const totalQuantity = countQuantity[0]?.totalQuantity || 0;

    return NextResponse.json({
      inventories,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalQuantity,
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
