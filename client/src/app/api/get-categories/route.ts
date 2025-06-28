import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const [categoriesMale, categoriesFemale] = await Promise.all([
      Category.find({ status: 1, gender: 1 }),
      Category.find({ status: 1, gender: 0 }),
    ]);
    return NextResponse.json({
      categoriesMale,
      categoriesFemale,
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
