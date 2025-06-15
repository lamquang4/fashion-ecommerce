import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Category.find();
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
