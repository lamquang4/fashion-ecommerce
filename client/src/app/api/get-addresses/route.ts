import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

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
