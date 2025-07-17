import { connectMongoDB } from "@/lib/MongoConnect";
import Cart from "@/model/Cart";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST() {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);

    const newCart = await Cart.create({
      user: session?.user.id || null,
      items: [],
      total: 0,
    });

    return NextResponse.json({ cartId: newCart._id });
  } catch (err) {
    return NextResponse.json(
      { error: err, msg: "Tạo giỏ hàng lỗi" },
      { status: 500 }
    );
  }
}
