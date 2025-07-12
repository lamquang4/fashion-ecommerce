import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import bcryptjs from "bcryptjs";
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
        { status: 400 }
      );
    }

    const checkPhone = await User.findOne({ phone, _id: { $ne: id } });
    if (checkPhone) {
      return NextResponse.json(
        { msg: "Số điện thoại đã được sử dụng" },
        { status: 400 }
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
      const salt = await bcryptjs.genSalt(10);
      const hashpassword = await bcryptjs.hash(password, salt);
      updatedData.password = hashpassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({ user: updatedUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
