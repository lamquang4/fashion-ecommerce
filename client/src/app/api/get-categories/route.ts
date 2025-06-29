import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const [categoriesMale, categoriesFemale] = await Promise.all([
      categoriesByGender(1),
      categoriesByGender(0),
    ]);

    return NextResponse.json({
      categoriesMale,
      categoriesFemale,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
