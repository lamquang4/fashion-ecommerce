import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import { validateNonNegativeNumber } from "@/utils/validateNonNegativeNumber";
import { validatePercentNumber } from "@/utils/validatePercentNumber";
import { validatePositiveNumber } from "@/utils/validatePositiveNumber";

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(
  req: NextRequest,
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

    if (coupon.status === 3) {
      return NextResponse.json(
        { msg: "Phiếu giảm giá đã hết hạn nên không được cập nhật!" },
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

    if (start < now && coupon.status != 1) {
      return NextResponse.json(
        { msg: "Ngày bắt đầu không được sau ngày hiện tại" },
        { status: 400 }
      );
    }

    if (start >= expiry && coupon.status != 1) {
      return NextResponse.json(
        { msg: "Ngày kết thúc phải sau ngày bắt đầu" },
        { status: 400 }
      );
    }

    if (!validatePositiveNumber(amount)) {
      return NextResponse.json(
        { msg: "Số lượng phải lớn hơn 0" },
        { status: 400 }
      );
    }

    if (!validatePositiveNumber(limit)) {
      return NextResponse.json(
        { msg: "Số lần dùng phải lớn hơn 0" },
        { status: 400 }
      );
    }

    if (discountType === "1") {
      if (!validatePositiveNumber(discountValue)) {
        return NextResponse.json(
          { msg: "Giá trị tiền cố định giảm giá phải lớn hơn 0" },
          { status: 400 }
        );
      }
    }

    if (discountType === "0") {
      if (!validatePercentNumber(discountValue)) {
        return NextResponse.json(
          { msg: "Giá trị % giảm giá từ 1 đến 100" },
          { status: 400 }
        );
      }
    }

    if (!validateNonNegativeNumber(minOrderValue)) {
      return NextResponse.json(
        {
          msg: "Giá trị tiền cố định đơn hàng tối thiểu phải lớn hơn hoặc bằng 0",
        },
        { status: 400 }
      );
    }

    if (discountType === "0") {
      if (!validatePositiveNumber(Number(maxDiscountValue))) {
        return NextResponse.json(
          {
            msg: "Giá trị tiền cố định giảm tối đa (chỉ áp dụng loại phiếu %) phải lớn hơn 0",
          },
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
      discountValue: discountValue,
      discountType,
      amount,
      limit,
      startDate,
      expiryDate,
      status,
    };

    if (discountType === 0) {
      couponData.maxDiscountValue = maxDiscountValue;
    }

    if (minOrderValue >= 0) {
      couponData.minOrderValue = minOrderValue;
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
