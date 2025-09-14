import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { validateEmail } from "@/utils/validateEmail";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();

    const user = await User.findOne({ email, role: 4 });
    if (!user) {
      return NextResponse.json(
        { message: "Email không tồn tại" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ msg: "Email không hợp lệ" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    user.resetToken = token;
    user.resetExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.NEXTAUTH_URL}/reset?token=${token}`;

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
      subject: "Đặt lại mật khẩu",
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
      src="${process.env.NEXTAUTH_URL}/assets/other/logo.png"
      width="80"
      aria-hidden="true"
      style="margin-bottom: 16px"
      alt="Aura"
    />
    <div
      style="
        border-bottom: 1px solid #dadce0;
        line-height: 32px;
        padding-bottom: 24px;
        text-align: center;
        word-break: break-word;
            font-family: Arial, sans-serif;
    color: black;
      "
    >
      <h2 style="font-size: 24px">Đặt lại mật khẩu</h2>
    </div>
    <div
      style="
        font-size: 16px;
        color: black;
        line-height: 20px;
        padding-top: 20px;
        text-align: left;
            font-family: Arial, sans-serif;
    color: black;
      "
    >
       <p>Chào ${user.fullname},</p>
      <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn.</p>
      <p>Xin lưu ý liên kết tạm thời này sẽ hết hạn sau 15 phút.</p>
      <a
        style="
          color: white;
          text-decoration: none;
          display: block;
          padding: 14px 16px;
          border-radius: 3px;
          text-align: center;
          background-color: black;
          margin-top: 20px;
        "
        href="${resetLink}"
      >
        Đặt lại mật khẩu
      </a>
    </div>
  </div>
</div>
`,
    });

    return NextResponse.json({ status: 20 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
