import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const size = await Size.findById(id);

    if (!size) {
      return NextResponse.json(
        { msg: "Không tìm thấy kích thước" },
        { status: 404 }
      );
    }

    return NextResponse.json({ size });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
