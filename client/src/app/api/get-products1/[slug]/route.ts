import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const keyword = searchParams.get("keyword") || "";

    const query: any = { slug: slug };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    const [products, total] =
      await Promise.all([
        Product.find(query)
          .populate("category", "slug namecategory gender")
          .skip(skip)
          .limit(limit),
        Product.countDocuments(query),
      ]);

    return NextResponse.json({
      productsMale: products,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
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
