import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/model/Cart";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

// đồng bộ giỏ hàng
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

    // giỏ hàng chưa đăng nhập
    const guestCart = await Cart.findById(cartId);
    // giỏ hàng đã đăng nhập
    const userCart = await Cart.findOne({ user: userId });

    if (guestCart && guestCart.user === null) {
      if (userCart) {
        // trường hợp user đã có giỏ hàng
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
        // trường hợp user chưa có giỏ hàng
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