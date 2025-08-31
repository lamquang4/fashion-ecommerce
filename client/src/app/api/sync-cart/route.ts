import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Cart from "@/model/Cart";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/MongoConnect";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    if (!userId)
      return NextResponse.json(
        { msg: "Tài khoản chưa đăng nhập" },
        { status: 401 }
      );

    const cartId = req.cookies.get("cart")?.value;

    if (!cartId || !mongoose.Types.ObjectId.isValid(cartId)) {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    const guestCart = await Cart.findById(cartId);
    const userCart = await Cart.findOne({ user: userId });

    if (guestCart && guestCart.user == null) {
      if (userCart) {
        for (const item of guestCart.items) {
          const existing = userCart.items.find(
            (it: any) =>
              it.variant.toString() === item.variant.toString() &&
              it.size.toString() === item.size.toString()
          );

          if (existing) {
            existing.quantity += item.quantity;
          } else {
            userCart.items.push(item);
          }
        }
        await userCart.save();
        await Cart.findByIdAndDelete(guestCart._id);
      } else {
        guestCart.user = userId;
        await guestCart.save();
      }
    }

    const response = NextResponse.json({ status: 200 });
    response.cookies.set({
      name: "cart",
      value: "",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ msg: "Lỗi", error }, { status: 500 });
  }
}
