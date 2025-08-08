import { connectMongoDB } from "@/lib/MongoConnect";
import Cart from "@/model/Cart";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
export async function DELETE(_req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;
    const cart = await Cart.find({ user: userId });
    if (!cart) {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    const deleteCart = await Cart.findOneAndDelete({ user: userId });

    return NextResponse.json({ cart: deleteCart }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
