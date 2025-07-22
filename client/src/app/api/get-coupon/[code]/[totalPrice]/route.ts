import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { code: string; totalPrice: number } }
) {
  try {
    await connectMongoDB();
    const { code, totalPrice } = await params;

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return NextResponse.json(
        { msg: "Mã giảm giá không khả dụng" },
        { status: 404 }
      );
    }

    const now = new Date();

    if (coupon.status !== 1) {
      return NextResponse.json(
        { msg: "Mã giảm giá không còn hoạt động" },
        { status: 404 }
      );
    }

    const start = new Date(coupon.startDate);
    const end = new Date(coupon.expiryDate);
    if (now < start) {
      return NextResponse.json(
        { msg: "Mã giảm giá chưa được bắt đầu" },
        { status: 404 }
      );
    }
    if (now > end) {
      return NextResponse.json(
        { msg: "Mã giảm giá đã hết hạn" },
        { status: 404 }
      );
    }

    if (coupon.minOrderValue && totalPrice < coupon.minOrderValue) {
      return NextResponse.json(
        {
          msg: `Đơn hàng cần tối thiểu ${coupon.minOrderValue.toLocaleString(
            "vi-VN"
          )}₫ để sử dụng mã này`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(coupon);
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
