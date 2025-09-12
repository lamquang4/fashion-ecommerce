import { connectMongoDB } from "@/lib/MongoConnect";
import Color from "@/model/Color";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const colors = await Color.aggregate([
      {
        $project: {
          _id: 1,
          namecolor: 1,
          codecolor: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!colors || colors.length === 0) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json({ colors }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
