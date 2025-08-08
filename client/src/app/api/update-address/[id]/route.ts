import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { validatePhone } from "@/utils/validatePhone";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const body = await req.json();

    const { fullname, phone, speaddress, city, ward, user } = body;

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { msg: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    const address = await Address.findById(id);
    if (!address) {
      return NextResponse.json(
        { msg: "Không tìm thấy địa chỉ" },
        { status: 404 }
      );
    }

    const updatedData: any = {
      fullname,
      phone,
      speaddress,
      city,
      ward,
      user,
    };

    const updatedAddress = await Address.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({ address: updatedAddress }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
