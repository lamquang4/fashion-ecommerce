import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { validatePhone } from "@/utils/validatePhone";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
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

    const newAddress = await Address.create({
      userId,
      fullname,
      phone,
      speaddress,
      city,
      ward,
    });

    return NextResponse.json({ address: newAddress }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
