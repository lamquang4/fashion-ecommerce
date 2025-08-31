import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const promotebanners = await Banner.find({ type: { $in: [2] } }).lean();

    if (!promotebanners || promotebanners.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        promotebanners,
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
