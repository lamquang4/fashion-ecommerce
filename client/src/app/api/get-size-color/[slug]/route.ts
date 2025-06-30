import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;

    const data = await Product.aggregate([
      { $match: { slug } },
      {
        $lookup: {
          from: "inventories",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$product", "$$productId"] } } },
            {
              $group: {
                _id: "$color",
              },
            },
            {
              $lookup: {
                from: "colors",
                localField: "_id",
                foreignField: "_id",
                as: "color",
              },
            },
            { $unwind: "$color" },
            {
              $replaceRoot: { newRoot: "$color" },
            },
          ],
          as: "colors",
        },
      },
      {
        $lookup: {
          from: "inventories",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$product", "$$productId"] } } },
            {
              $group: {
                _id: "$size",
              },
            },
            {
              $lookup: {
                from: "sizes",
                localField: "_id",
                foreignField: "_id",
                as: "size",
              },
            },
            { $unwind: "$size" },
            {
              $replaceRoot: { newRoot: "$size" },
            },
          ],
          as: "sizes",
        },
      },
    ]);

    if (!data) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

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
