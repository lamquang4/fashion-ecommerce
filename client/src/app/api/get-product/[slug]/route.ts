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
    const { slug } = params;

    const data = await Product.aggregate([
      { $match: { slug } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "inventories",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$product", "$$productId"] } } },
            {
              $lookup: {
                from: "sizes",
                localField: "size",
                foreignField: "_id",
                as: "size",
              },
            },
            { $unwind: "$size" },
            {
              $lookup: {
                from: "colors",
                localField: "color",
                foreignField: "_id",
                as: "color",
              },
            },
            { $unwind: "$color" },
          ],
          as: "inventories",
        },
      },
    ]);

    if (!data) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: data[0] });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
