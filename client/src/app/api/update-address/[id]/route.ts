import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { validatePhone } from "@/utils/validatePhone";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

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
      user: userId,
    };

    await Address.findByIdAndUpdate(id, updatedData, {
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
