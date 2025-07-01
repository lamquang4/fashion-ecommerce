import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export async function GET(
  req: NextRequest,
  { params }: { params: { category: string; product: string } }
) {
  try {
    await connectMongoDB();
    const { category, product } = await params;
    const categoryId = new ObjectId(category);
    const productId = new ObjectId(product);
    const data = await Product.aggregate([
      { $match: { category: categoryId, _id: { $ne: productId } } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $match: { "category.gender": 1 } },
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
      { $limit: 10 },
    ]);

    if (!data) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({ products: data });
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
