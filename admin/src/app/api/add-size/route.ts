import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { namesize, chest, waist, hip, height, weight } = body;

    if (chest[0] >= chest[1]) {
      return NextResponse.json(
        { msg: "Vòng ngực tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (waist[0] >= waist[1]) {
      return NextResponse.json(
        { msg: "Vòng eo tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (hip[0] >= hip[1]) {
      return NextResponse.json(
        { msg: "Vòng mông tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (height[0] >= height[1]) {
      return NextResponse.json(
        { msg: "Chiều cao tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (weight[0] >= weight[1]) {
      return NextResponse.json(
        { msg: "Cân nặng tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }

    const checkName = await Size.findOne({ namesize });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên kích thước đã được sử dụng" },
        { status: 409 }
      );
    }

    await Size.create({
      namesize,
      chest,
      waist,
      hip,
      height,
      weight,
    });

    return NextResponse.json({ status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
