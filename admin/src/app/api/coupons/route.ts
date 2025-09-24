import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import { validateNonNegativeNumber } from "@/utils/validateNonNegativeNumber";
import { validatePercentNumber } from "@/utils/validatePercentNumber";
import { validatePositiveNumber } from "@/utils/validatePositiveNumber";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";
    const query: any = {};
    if (q) {
      query.code = { $regex: q, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [coupons, total] = await Promise.all([
      Coupon.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Coupon.countDocuments(query),
    ]);

    if (!coupons || coupons.length === 0) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(
      {
        coupons,
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

    const checkCode = await Coupon.findOne({ code });
    if (checkCode) {
      return NextResponse.json(
        { msg: "Mã phiếu giảm giá đã được sử dụng" },
        { status: 409 }
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

    if (amount < limit) {
      return NextResponse.json(
        { msg: "Số lượng phát hành phải lớn hơn số lần dùng" },
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

    await Coupon.create(couponData);

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
