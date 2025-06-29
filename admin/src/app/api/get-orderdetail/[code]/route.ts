import { connectMongoDB } from "@/lib/MongoConnect";
import OrderDetail from "@/model/OrderDetail";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const data = await OrderDetail.aggregate([
      {
        $match: { order: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "orders",
          localField: "order",
          foreignField: "_id",
          as: "order",
        },
      },
      { $unwind: "$order" },
      {
        $lookup: {
          from: "coupons",
          localField: "order.coupon",
          foreignField: "_id",
          as: "order.coupon",
        },
      },
      {
        $unwind: {
          path: "$order.coupon",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "buy.product",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $lookup: {
          from: "sizes",
          localField: "buy.size",
          foreignField: "_id",
          as: "sizes",
        },
      },
      {
        $lookup: {
          from: "colors",
          localField: "buy.color",
          foreignField: "_id",
          as: "colors",
        },
      },
      {
        $addFields: {
          buy: {
            $map: {
              input: { $range: [0, { $size: "$buy" }] },
              as: "i",
              in: {
                product: {
                  $arrayElemAt: ["$products", "$$i"],
                },
                size: {
                  $arrayElemAt: ["$sizes", "$$i"],
                },
                color: {
                  $arrayElemAt: ["$colors", "$$i"],
                },
                quantity: {
                  $arrayElemAt: ["$buy.quantity", "$$i"],
                },
              },
            },
          },
        },
      },
    ]);

    if (!data) {
      return NextResponse.json(
        { msg: "Không tìm thấy chi tiết đơn hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
