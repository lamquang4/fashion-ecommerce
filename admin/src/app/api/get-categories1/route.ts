import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const categories = await Category.find().sort({ gender: -1 });

    return NextResponse.json({ categories });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
