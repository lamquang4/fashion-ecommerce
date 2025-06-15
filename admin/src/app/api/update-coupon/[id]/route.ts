import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import { validatePositiveInt } from "@/utils/validtePositiveInt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const body = await req.json();

    const {
      code,
      discountValue,
      discountType,
      amount,
      limit,
      startDate,
      expiryDate,
      minOrderValue,
      maxDiscountValue,
    } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return NextResponse.json(
        { msg: "Không tìm thấy phiếu giảm giá" },
        { status: 404 }
      );
    }

    const checkCode = await Coupon.findOne({ code, _id: { $ne: id } });
    if (checkCode) {
      return NextResponse.json(
        { msg: "Mã phiếu giảm giá đã được sử dụng" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const expiry = new Date(expiryDate);
    const now = new Date();

    if (start < now) {
      return NextResponse.json(
        { msg: "Ngày bắt đầu không được sau ngày hiện tại" },
        { status: 400 }
      );
    }

    if (start >= expiry) {
      return NextResponse.json(
        { msg: "Ngày kết thúc phải sau ngày bắt đầu" },
        { status: 400 }
      );
    }

    if (!validatePositiveInt(amount)) {
      return NextResponse.json(
        { msg: "Số lượng phải là số nguyên dương" },
        { status: 400 }
      );
    }

    if (!validatePositiveInt(limit)) {
      return NextResponse.json(
        { msg: "Số lần dùng phải là số nguyên dương" },
        { status: 400 }
      );
    }

    if (!validatePositiveInt(discountValue)) {
      return NextResponse.json(
        { msg: "Giá trị giảm giá phải là số nguyên dương" },
        { status: 400 }
      );
    }

    if (!validatePositiveInt(minOrderValue)) {
      return NextResponse.json(
        { msg: "Giá trị đơn hàng tối thiểu phải là số nguyên dương" },
        { status: 400 }
      );
    }

    if (discountType === "0") {
      if (!validatePositiveInt(Number(maxDiscountValue))) {
        return NextResponse.json(
          { msg: "Giá trị giảm tối đa (áp dụng %) phải là số nguyên dương" },
          { status: 400 }
        );
      }
    }

    let status = 1; // mặc định là đang hiệu lực

    if (now < start) {
      status = 0; // chưa đến ngày bắt đầu
    } else if (now > expiry) {
      status = 3; // hết hạn mà chưa dùng hết
    } else if (amount <= 0) {
      status = 2; // hết lượt dùng
    }

    const couponData: any = {
      code,
      discountValue: discountType === 1 ? 0 : discountValue,
      discountType,
      amount,
      limit,
      startDate,
      expiryDate,
      minOrderValue,
      status,
    };

    if (discountType === 0) {
      couponData.maxDiscountValue = maxDiscountValue;
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, couponData, {
      new: true,
    });

    return NextResponse.json({ coupon: updatedCoupon }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
