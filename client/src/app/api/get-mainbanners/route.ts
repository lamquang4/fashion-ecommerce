import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const [banners1, banners2] = await Promise.all([
      Banner.find({ type: { $in: [1] } }),
      Banner.find({ type: { $in: [0] } }),
    ]);
    return NextResponse.json({
      banners1,
      banners2,
    });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
