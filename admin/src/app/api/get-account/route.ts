import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    const admin = await User.findById(userId);

    if (!admin) {
      return NextResponse.json(
        { msg: "Không tìm thấy quản trị viên" },
        { status: 404 }
      );
    }

    return NextResponse.json(admin);
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
