import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ category: string; product: string }> }
) {
  try {
    await connectMongoDB();
    const { category, product } = await params;
    if (!ObjectId.isValid(category) || !ObjectId.isValid(product)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }
    const limit = 12;

    const productsCateogry = await Product.aggregate([
      {
        $match: {
          category: new ObjectId(category),
          _id: { $ne: new ObjectId(product) },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "inventories",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$product", "$$productId"] },
              },
            },
            {
              $lookup: {
                from: "colors",
                localField: "color",
                foreignField: "_id",
                as: "color",
              },
            },
            { $unwind: "$color" },
            { $unwind: "$inventories" },
            {
              $lookup: {
                from: "sizes",
                localField: "inventories.size",
                foreignField: "_id",
                as: "inventories.size",
              },
            },
            {
              $unwind: "$inventories.size",
            },
            {
              $group: {
                _id: "$_id",
                product: { $first: "$product" },
                images: { $first: "$images" },
                color: {
                  $first: {
                    _id: "$color._id",
                    namecolor: "$color.namecolor",
                    codecolor: "$color.codecolor",
                  },
                },
                inventories: {
                  $push: {
                    size: {
                      _id: "$inventories.size._id",
                      namesize: "$inventories.size.namesize",
                    },
                    quantity: "$inventories.quantity",
                  },
                },
              },
            },
            { $sort: { _id: 1 } },
          ],
          as: "variants",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          discount: 1,
          description: 1,
          slug: 1,
          status: 1,
          createdAt: 1,
          category: {
            _id: "$category._id",
            namecategory: "$category.namecategory",
            gender: "$category.gender",
          },
          variants: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      { $limit: limit },
    ]);

    if (!productsCateogry || productsCateogry.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({ productsCateogry }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
