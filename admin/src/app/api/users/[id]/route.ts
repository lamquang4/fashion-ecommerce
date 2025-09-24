import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import User from "@/model/User";
import { hashValue } from "@/utils/hashValue";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $project: {
          _id: 0,
          password: 0,
          __v: 0,
        },
      },
    ]);

    if (!user) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json({ user: user[0] }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}

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

    await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

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
