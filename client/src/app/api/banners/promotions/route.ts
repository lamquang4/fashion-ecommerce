import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const promotions = await Banner.find({ type: { $in: [2] } }).lean();

    if (!promotions || promotions.length === 0) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(
      {
        promotions,
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
