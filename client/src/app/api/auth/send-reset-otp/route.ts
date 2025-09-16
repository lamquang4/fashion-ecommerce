import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateEmail } from "@/utils/validateEmail";
import Otp from "@/model/Otp";
import { hashValue } from "@/utils/hashValue";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();

    if (!validateEmail(email)) {
      return NextResponse.json({ msg: "Email không hợp lệ" }, { status: 400 });
    }

    const checkEmail = await User.findOne({ email, role: 4 });
    if (!checkEmail) {
      return NextResponse.json(
        { message: "Email không tồn tại" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 15 * 60 * 1000;
    const hashOtp = await hashValue(otp);

    const checkOtp = await Otp.findOne({ email });
    if (checkOtp) {
      await Otp.updateOne({ email }, { $set: { otp: hashOtp, otpExpires } });
    } else {
      await Otp.create({
        email,
        otp: hashOtp,
        otpExpires,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Aura fashion" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Mã của bạn là ${otp}`,
      html: `<div
  style="
    padding-bottom: 20px;
    padding-top: 20px;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
  "
>
  <div
    style="
      border-style: solid;
      border-width: thin;
      border-color: #dadce0;
      border-radius: 8px;
      padding: 40px 20px;
    "
    align="center"
  >
    <img
      src="https://aura-fashion-five.vercel.app/assets/other/logo.png"
      width="100px"
      aria-hidden="true"
      style="margin-bottom: 16px"
      alt="Aura"
    />
    <div
      style="
        font-size: 16px;
        color: black;
        line-height: 20px;
        padding-top: 20px;
        text-align:center;
            font-family: Arial, sans-serif;
    color: black;
      "
    >
      <p>Mã xác minh của bạn:</p>
<h2 style="letter-spacing:8px;text-align:center;">${otp}</h2>
      <p>Mã này chỉ dùng được một lần.</p>
   <p>Mã sẽ hết hạn sau 15 phút.</p>
    </div>
  </div>
</div>
`,
    });

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
