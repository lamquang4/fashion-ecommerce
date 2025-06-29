import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import OrderDetail from "@/model/OrderDetail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const successfulOrders = await Order.find({ status: 3 }).select("_id");
    const successfulOrderIds = successfulOrders.map((order) => order._id);

    const top5Products = await OrderDetail.aggregate([
      {
        $match: {
          order: { $in: successfulOrderIds },
        },
      },
      { $unwind: "$buy" },
      {
        $group: {
          _id: "$buy.product",
          totalSold: { $sum: "$buy.quantity" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $project: {
          productId: "$_id",
          name: "$productInfo.name",
          image: "$productInfo.image",
          totalSold: 1,
          price: "$productInfo.price",
          discount: "$productInfo.discount",
        },
      },
    ]);

    return NextResponse.json({
      top5Products,
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
