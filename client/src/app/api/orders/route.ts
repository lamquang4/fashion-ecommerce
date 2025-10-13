import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import { validatePhone } from "@/utils/validatePhone";
import Inventory from "@/model/Inventory";
import Coupon from "@/model/Coupon";
import Cart from "@/model/Cart";

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
        { status: 401 }
      );
    }

    const query: any = {
      user: new mongoose.Types.ObjectId(userId),
      status: { $ne: -1 },
    };
    if (status) {
      query.status = parseInt(status);
    } else {
      query.status = { $ne: -1 };
    }

    const [orders, total] = await Promise.all([
      Order.aggregate([
        {
          $match: { ...query },
        },
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
        { $unwind: "$items" },
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $lookup: {
            from: "sizes",
            localField: "items.size",
            foreignField: "_id",
            as: "size",
          },
        },
        { $unwind: "$size" },
        {
          $lookup: {
            from: "colors",
            localField: "items.color",
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
                quantity: "$items.quantity",
                price: "$items.price",
                discount: "$items.discount",
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

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy đơn hàng",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        orders,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
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

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectMongoDB();

    const {
      fullname,
      phone,
      speaddress,
      city,
      ward,
      paymethod,
      coupon,
      total,
      productsBuy,
    } = await req.json();

    const userSession = await getServerSession(options);
    const userId = userSession?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { msg: "Tài khoản chưa đăng nhập" },
        { status: 401 }
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { msg: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    // Tạo đơn
    const generateOrderCode = () =>
      (Math.random().toString(36) + Math.random().toString(36))
        .substring(2, 12)
        .toUpperCase();

    let orderCode = generateOrderCode();
    while (await Order.exists({ orderCode })) {
      orderCode = generateOrderCode();
    }

    const newOrder = await Order.create(
      [
        {
          orderCode,
          user: userId,
          fullname,
          phone,
          speaddress,
          city,
          ward,
          paymethod,
          total,
          items: productsBuy,
          ...(coupon && { coupon }),
          status: paymethod === 1 ? -1 : 0,
        },
      ],
      { session }
    );

    if (paymethod === 0) {
      // Cập nhật tồn kho từng sản phẩm
      for (const item of productsBuy) {
        const { product, color, size, quantity } = item;

        const updated = await Inventory.updateOne(
          {
            product,
            color,
            inventories: { $elemMatch: { size, quantity: { $gte: quantity } } },
          },
          {
            $inc: { "inventories.$[elem].quantity": -quantity },
          },
          {
            arrayFilters: [{ "elem.size": size }],
            session,
          }
        );

        if (updated.modifiedCount === 0) {
          await session.abortTransaction();
          session.endSession();
        }
      }

      // Trừ coupon
      if (coupon) {
        await Coupon.findByIdAndUpdate(
          coupon,
          { $inc: { amount: -1 } },
          { session }
        );
      }

      // Xóa giỏ hàng
      await Cart.findOneAndDelete({ user: userId }, { session });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ order: newOrder[0] }, { status: 201 });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        err,
        msg: "Lỗi",
      },
      {
        status: 500,
      }
    );
  }
}
