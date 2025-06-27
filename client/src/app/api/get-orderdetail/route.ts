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

    const data = await OrderDetail.find({ order: id })
      .populate({
        path: "order",
        select:
          "address user orderCode coupon paymethod status total createdAt",
        populate: {
          path: "coupon",
          select:
            "code discountValue discountType minOrderValue maxDiscountValue",
        },
      })
      .populate("buy.product", "name price image discount")
      .populate("buy.size", "namesize")
      .populate("buy.color", "namecolor codecolor");

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
