import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    const session = await getServerSession(options);
    const userId = session?.user?.id;
    const status = searchParams.get("status");

    if (!userId) {
      return NextResponse.json(
        { msg: "Tài khoản chưa đăng nhập" },
        { status: 404 }
      );
    }

    const query: any = { user: new mongoose.Types.ObjectId(userId) };
    if (status) {
      query.status = parseInt(status);
    }

    const [orders, total] = await Promise.all([
      Order.aggregate([
        {
          $match: { ...query },
        },
        {
          $lookup: {
            from: "orderdetails",
            localField: "_id",
            foreignField: "order",
            as: "orderDetail",
          },
        },
        { $unwind: "$orderDetail" },
        {
          $lookup: {
            from: "coupons",
            localField: "coupon",
            foreignField: "_id",
            as: "coupon",
          },
        },
        {
          $unwind: {
            path: "$coupon",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: "$orderDetail.items",
        },
        {
          $lookup: {
            from: "products",
            localField: "orderDetail.items.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $lookup: {
            from: "sizes",
            localField: "orderDetail.items.size",
            foreignField: "_id",
            as: "size",
          },
        },
        { $unwind: "$size" },
        {
          $lookup: {
            from: "colors",
            localField: "orderDetail.items.color",
            foreignField: "_id",
            as: "color",
          },
        },
        { $unwind: "$color" },
        {
          $lookup: {
            from: "inventories",
            let: {
              productId: "$product._id",
              colorId: "$color._id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$product", "$$productId"] },
                      { $eq: ["$color", "$$colorId"] },
                    ],
                  },
                },
              },
            ],
            as: "inventory",
          },
        },
        {
          $unwind: {
            path: "$inventory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            orderCode: { $first: "$orderCode" },
            user: { $first: "$user" },
            fullname: { $first: "$fullname" },
            phone: { $first: "$phone" },
            speaddress: { $first: "$speaddress" },
            city: { $first: "$city" },
            ward: { $first: "$ward" },
            paymethod: { $first: "$paymethod" },
            status: { $first: "$status" },
            total: { $first: "$total" },
            createdAt: { $first: "$createdAt" },
            coupon: { $first: "$coupon" },
            productsBuy: {
              $push: {
                product: {
                  _id: "$product._id",
                  name: "$product.name",
                },
                variant: {
                  images: "$inventory.images",
                  size: {
                    _id: "$size._id",
                    namesize: "$size.namesize",
                  },
                  color: {
                    _id: "$color._id",
                    namecolor: "$color.namecolor",
                    codecolor: "$color.codecolor",
                  },
                },
                quantity: "$orderDetail.items.quantity",
                price: "$orderDetail.items.price",
                discount: "$orderDetail.items.discount",
              },
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
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
