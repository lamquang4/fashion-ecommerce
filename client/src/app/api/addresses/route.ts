import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { validatePhone } from "@/utils/validatePhone";

export async function GET() {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { msg: "Tài khoản chưa đăng nhập" },
        { status: 401 }
      );
    }

    const addresses = await Address.find({ user: userId }).lean();

    if (!addresses || addresses.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy địa chỉ" },
        { status: 404 }
      );
    }

    return NextResponse.json({ addresses }, { status: 200 });
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

    const session = await getServerSession(options);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { msg: "Tài khoản chưa đăng nhập" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { fullname, phone, speaddress, city, ward } = body;

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { msg: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    await Address.create({
      fullname,
      phone,
      speaddress,
      city,
      ward,
      user: userId,
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
