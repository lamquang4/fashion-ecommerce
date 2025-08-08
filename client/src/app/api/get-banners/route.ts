import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    await connectMongoDB();

    const [banners1, banners2, promotebanners, collections] = await Promise.all(
      [
        Banner.find({ type: 0, status: 1 }),
        Banner.find({ type: 1, status: 1 }),
        Banner.find({ type: { $in: [2] } }),
        Banner.find({ type: { $in: [3] } }),
      ]
    );
    return NextResponse.json({
      banners1,
      banners2,
      promotebanners,
      collections,
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
