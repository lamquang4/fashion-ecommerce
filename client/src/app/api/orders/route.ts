import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import { validatePhone } from "@/utils/validatePhone";
import OrderDetail from "@/model/OrderDetail";
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

    const session = await getServerSession(options);
    const userId = session?.user?.id;

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

    const generateOrderCode = () =>
      (Math.random().toString(36) + Math.random().toString(36))
        .substring(2, 12)
        .toUpperCase();

    let orderCode = generateOrderCode();
    while (await Order.exists({ orderCode })) {
      orderCode = generateOrderCode();
    }

    const newOrderData: any = {
      orderCode,
      user: userId,
      fullname,
      phone,
      speaddress,
      city,
      ward,
      paymethod,
      total,
      status: 0,
    };

    if (coupon) {
      newOrderData.coupon = coupon;
    }

    const newOrder = await Order.create(newOrderData);

    await OrderDetail.create({
      order: newOrder._id,
      items: productsBuy,
    });

    // Cập nhật tồn kho
    for (const item of productsBuy) {
      const { product, color, size, quantity } = item;

      const inventory = await Inventory.findOne({
        product,
        color,
      });

      if (inventory) {
        const inventoryItem = inventory.inventories.find(
          (inv: any) => inv.size.toString() === size
        );

        if (inventoryItem) {
          inventoryItem.quantity -= quantity;
          if (inventoryItem.quantity < 0) inventoryItem.quantity = 0;
        }

        await inventory.save();
      }
    }

    if (coupon) {
      await Coupon.findByIdAndUpdate(coupon, { $inc: { amount: -1 } });
    }

    // xóa giỏ hàng
    const cart = await Cart.find({ user: userId });
    if (!cart) {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    await Cart.findOneAndDelete({ user: userId });

    return NextResponse.json({ status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
