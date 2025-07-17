import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { validatePhone } from "@/utils/validatePhone";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { user, fullname, phone, speaddress, city, ward } = body;

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { msg: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    const newAddress = await Address.create({
      user,
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
        status: 400,
      }
    );
  }
}
