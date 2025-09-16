import { connectMongoDB } from "@/lib/MongoConnect";
import Otp from "@/model/Otp";
import User from "@/model/User";
import { compareValue } from "@/utils/compareValue";
import { hashValue } from "@/utils/hashValue";
import { validateBirthday } from "@/utils/validateBirthday";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { fullname, email, phone, birthday, password, otp } = body;

    if (!validateEmail(email)) {
      return NextResponse.json({ msg: "Email không hợp lệ" }, { status: 400 });
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { msg: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    if (!validateBirthday(birthday)) {
      return NextResponse.json(
        { msg: "Bạn phải đủ 18 tuổi trở lên" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { msg: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return NextResponse.json(
        { msg: "Email đã được sử dụng" },
        { status: 409 }
      );
    }

    const checkPhone = await User.findOne({ phone });
    if (checkPhone) {
      return NextResponse.json(
        { msg: "Số điện thoại đã được sử dụng" },
        { status: 409 }
      );
    }

    const currentOtp = await Otp.findOne({ email });
    const isMatch = await compareValue(otp, currentOtp.otp);
    if (!isMatch) {
      return NextResponse.json({ msg: "Mã OTP không hợp lệ" }, { status: 400 });
    }

    if (currentOtp.otpExpires < Date.now()) {
      return NextResponse.json({ msg: "Mã OTP đã hết hạn" }, { status: 400 });
    }

    const hashPassword = await hashValue(password);
    await User.create({
      fullname,
      email,
      phone,
      birthday,
      password: hashPassword,
      role: 4,
      status: 1,
    });

    await Otp.findByIdAndDelete(currentOtp._id);

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
