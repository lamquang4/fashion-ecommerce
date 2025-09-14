import jwt from "jsonwebtoken";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectMongoDB } from "@/lib/MongoConnect";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { token, password } = await req.json();
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findOne({
      _id: decoded.userId,
      resetToken: token,
      resetExpires: { $gt: Date.now() },
      role: 4,
    });

    if (!user) {
      return NextResponse.json(
        { msg: "Đặt lại mật khẩu thất bại. Xin hãy lại thử lại lần nữa." },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);
    await User.updateOne(
      { _id: user._id },
      {
        $unset: { resetToken: "", resetExpires: "" },
        $set: { password: hashpassword },
      }
    );

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
