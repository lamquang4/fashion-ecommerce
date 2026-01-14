import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { hashValue } from "@/utils/hashValue";
import { validateBirthday } from "@/utils/validateBirthday";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";

    const query: any = { role: { $in: [4, 5] } };
    if (q) {
      query.$or = [
        { fullname: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [customers, total] = await Promise.all([
      User.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            password: 0,
          },
        },
      ]),
      User.countDocuments(query),
    ]);

    if (!customers || customers.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        customers,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}

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

    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
