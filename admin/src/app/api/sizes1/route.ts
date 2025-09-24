import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const sizes = await Size.aggregate([
      {
        $project: {
          _id: 1,
          namesize: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!sizes || sizes.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy" },
        { status: 404 }
      );
    }

    return NextResponse.json({ sizes }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
