import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";

    const query: any = {};
    if (q) {
      query.$or = [{ namesize: { $regex: q, $options: "i" } }];
    }

    const [sizes, total] = await Promise.all([
      Size.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Size.countDocuments(query),
    ]);

    if (!sizes || sizes.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        sizes,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}

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
