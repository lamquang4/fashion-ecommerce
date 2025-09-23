import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const [banners1, banners2] = await Promise.all([
      Banner.find({ type: 0, status: 1 }).lean(),
      Banner.find({ type: 1, status: 1 }).lean(),
    ]);

    if (!banners1 || banners1.length === 0) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    if (!banners2 || banners2.length === 0) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(
      {
        banners1,
        banners2,
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
