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

    const [categoriesMale, categoriesFemale] = await Promise.all([
      categoriesByGender(1),
      categoriesByGender(0),
    ]);

    if (!categoriesMale || categoriesMale.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục nam" },
        { status: 404 }
      );
    }

    if (!categoriesFemale || categoriesFemale.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục nữ" },
        { status: 404 }
      );
    }

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
