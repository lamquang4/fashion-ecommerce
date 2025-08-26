import { connectMongoDB } from "@/lib/MongoConnect";
import Size from "@/model/Size";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    await connectMongoDB();

    const sizes = await Size.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      sizes,
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
