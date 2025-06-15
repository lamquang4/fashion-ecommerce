import { connectMongoDB } from "@/lib/MongoConnect";
import Color from "@/model/Color";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { namecolor, codecolor } = body;

    const checkName = await Color.findOne({ namecolor });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên màu đã được sử dụng" },
        { status: 400 }
      );
    }

    const newColor = await Color.create({
      namecolor,
      codecolor,
    });

    return NextResponse.json({ color: newColor }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
