import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await User.find({ role: { $in: [0, 1, 2, 3] } });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
