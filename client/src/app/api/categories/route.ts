import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const categoriesByGender = async (gender: number) => {
      return Category.aggregate([
        { $match: { status: 1, gender: gender } },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "products",
            pipeline: [{ $match: { status: 1 } }],
          },
        },
        {
          $addFields: {
            productCount: { $size: "$products" },
          },
        },
        {
          $match: {
            productCount: { $gt: 0 },
          },
        },
      ]);
    };

    const results = await Promise.allSettled([
      categoriesByGender(1),
      categoriesByGender(0),
    ]);

    const categoriesMale =
      results[0].status === "fulfilled" ? results[0].value : [];
    const categoriesFemale =
      results[1].status === "fulfilled" ? results[1].value : [];
      
    return NextResponse.json(
      {
        categoriesMale,
        categoriesFemale,
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
