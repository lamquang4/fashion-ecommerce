import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { validateBirthday } from "@/utils/validateBirthday";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { fullname, email, phone, birthday, password } = body;

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
        { status: 400 }
      );
    }

    const checkPhone = await User.findOne({ phone });
    if (checkPhone) {
      return NextResponse.json(
        { msg: "Số điện thoại đã được sử dụng" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      fullname,
      email,
      phone,
      birthday,
      password: hashpassword,
      role: 4,
      status: 1,
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
