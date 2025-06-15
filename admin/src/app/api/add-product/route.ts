import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const { name, price, discount, description, images, category } = body;

    const newProduct = await Product.create({
      name,
      price,
      discount,
      description,
      images,
      slug: "abc",
      status: 0,
      category,
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
