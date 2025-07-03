import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { user, address, paymethod, coupon, total } = body;

    const newOrder = await Order.create({});

    return NextResponse.json({ user: newOrder }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
