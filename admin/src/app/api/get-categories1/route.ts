import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const [categories, categoriesStatus1] = await Promise.all([
      Category.find().sort({ gender: -1 }),
      Category.find({ status: 1 }).sort({ gender: -1 }),
    ]);
    return NextResponse.json({
      categories,
      categoriesStatus1,
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
