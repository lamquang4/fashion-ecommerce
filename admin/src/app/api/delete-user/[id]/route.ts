import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import User from "@/model/User";
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

    const checkUser = await Order.findOne({ user: id });
    if (checkUser) {
      return NextResponse.json(
        {
          msg: "Người dùng này đẫ mua hàng nên không được xóa!",
        },
        { status: 409 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { msg: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
