import { connectMongoDB } from "@/lib/MongoConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/model/Cart";
import { options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);
    const userId = session?.user?.id || null;

    const { variant, size, quantity } = await req.json();
    const cartId = req.cookies.get("cart")?.value;

    let cart = null;

    if (userId && cartId && mongoose.Types.ObjectId.isValid(cartId)) {
      const guestCart = await Cart.findById(cartId);
      const userCart = await Cart.findOne({ user: userId });

      if (guestCart && guestCart.user == null) {
        if (userCart) {
          for (const item of guestCart.items) {
            const existingItem = userCart.items.find(
              (it: any) =>
                it.variant.toString() === item.variant.toString() &&
                it.size.toString() === item.size.toString()
            );

            if (existingItem) {
              existingItem.quantity += item.quantity;
            } else {
              userCart.items.push(item);
            }
          }
          await userCart.save();

          await Cart.findByIdAndDelete(guestCart._id);

          cart = userCart;
        } else {
          guestCart.user = userId;
          await guestCart.save();
          cart = guestCart;
        }
      }
    }

    if (!cart) {
      if (cartId && mongoose.Types.ObjectId.isValid(cartId)) {
        cart = await Cart.findById(cartId);
      }

      if (!cart) {
        cart = await Cart.create({
          user: userId,
          items: [],
        });
      }
    }

    const existingItem = cart.items.find(
      (item: any) =>
        item.variant.toString() === variant && item.size.toString() === size
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      existingItem.quantity = newQuantity > 15 ? 15 : newQuantity;
    } else {
      cart.items.push({
        variant: variant,
        size: size,
        quantity: quantity > 15 ? 15 : quantity,
      });
    }

    await cart.save();

    const response = NextResponse.json({ status: 200 });

    if (!userId && !cartId) {
      response.cookies.set({
        name: "cart",
        value: String(cart._id),
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }

    if (userId && cartId) {
      response.cookies.set({
        name: "cart",
        value: "",
        path: "/",
        expires: new Date(0),
      });
    }

    return response;

  } catch (err) {
    return NextResponse.json({ msg: "Lỗi", err }, { status: 500 });
  }
}
