import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/MongoConnect";
import { validateEmail } from "@/utils/validateEmail";
import Otp from "@/model/Otp";
import { hashValue } from "@/utils/hashValue";
import bcryptjs from "bcryptjs";
import { compareValue } from "@/utils/compareValue";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { otp, password, email } = await req.json();

    if (!validateEmail(email)) {
      return NextResponse.json({ msg: "Email không hợp lệ" }, { status: 400 });
    }

    const user = await User.findOne({ email, role: 4 });
    if (!user) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    const currentOtp = await Otp.findOne({ email: email });
    const isMatch = await compareValue(otp, currentOtp.otp);
    if (!isMatch) {
      return NextResponse.json({ msg: "Mã OTP không hợp lệ" }, { status: 400 });
    }

    if (currentOtp.otpExpires < Date.now()) {
      return NextResponse.json({ msg: "Mã OTP đã hết hạn" }, { status: 400 });
    }

    const hashPassword = await hashValue(password);
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: { password: hashPassword },
      }
    );

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
