import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { hashValue } from "@/utils/hashValue";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const body = await req.json();

    const { fullname, email, phone, birthday, password, role } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ msg: "Email không hợp lệ" }, { status: 400 });
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { msg: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { msg: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    const checkEmail = await User.findOne({ email, _id: { $ne: id } });
    if (checkEmail) {
      return NextResponse.json(
        { msg: "Email đã được sử dụng" },
        { status: 409 }
      );
    }

    const checkPhone = await User.findOne({ phone, _id: { $ne: id } });
    if (checkPhone) {
      return NextResponse.json(
        { msg: "Số điện thoại đã được sử dụng" },
        { status: 409 }
      );
    }

    const updatedData: any = {
      fullname,
      email,
      phone,
      birthday,
    };

    if (role) {
      updatedData.role = role;
    }

    if (password) {
      const hashPassword = await hashValue(password);
      updatedData.password = hashPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
