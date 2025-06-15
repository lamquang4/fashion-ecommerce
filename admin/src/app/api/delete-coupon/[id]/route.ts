import { connectMongoDB } from "@/lib/MongoConnect";
import Coupon from "@/model/Coupon";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

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
