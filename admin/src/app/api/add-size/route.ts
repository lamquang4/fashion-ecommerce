import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { namesize } = body;

    const checkName = await Size.findOne({ namesize });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên kích thước đã được sử dụng" },
        { status: 400 }
      );
    }

    const newSize = await Size.create({
      namesize,
    });

    return NextResponse.json({ size: newSize }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
