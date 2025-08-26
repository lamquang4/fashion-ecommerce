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

    return NextResponse.json({ sizes });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
