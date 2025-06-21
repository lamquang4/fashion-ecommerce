import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Inventory.find()
      .populate("product", "name image")
      .populate("size", "namesize")
      .populate("color", "namecolor codecolor")
      .sort({ product: 1, createdAt: -1 });
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
