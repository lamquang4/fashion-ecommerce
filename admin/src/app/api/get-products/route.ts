import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Product.find();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Something was wrong" },
      {
        status: 400,
      }
    );
  }
}
