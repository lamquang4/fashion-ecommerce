import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import Order from "@/model/Order";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const checkCoupon = await Order.findOne({ coupon: id });
    if (checkCoupon) {
      return NextResponse.json(
        {
          msg: "Phiếu giảm giá này đẫ được sử dụng cho đơn hàng nên không được xóa!",
        },
        {
          status: 404,
        }
      );
    }

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return NextResponse.json(
        { msg: "Không tìm thấy phiếu giảm giá" },
        { status: 404 }
      );
    }

    const deleteCoupon = await Coupon.findByIdAndDelete(id);

    return NextResponse.json({ coupon: deleteCoupon }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
