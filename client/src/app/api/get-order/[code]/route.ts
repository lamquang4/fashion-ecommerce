import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    await connectMongoDB();
    const { code } = await params;

    const data = await Order.aggregate([
      {
        $match: { orderCode: code },
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
    ]);

    if (!data) {
      return NextResponse.json(
        { msg: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
