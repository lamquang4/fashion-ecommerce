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

    return NextResponse.json({ colors });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
