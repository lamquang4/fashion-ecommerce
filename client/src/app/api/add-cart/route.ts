import { connectMongoDB } from "@/lib/MongoConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/model/Cart";
import { options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import Inventory from "@/model/Inventory";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);
    const userId = session?.user?.id || null;

    const { variant, size, quantity } = await req.json();
    const cartId = req.cookies.get("cart")?.value;

    const inventory = await Inventory.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(variant) } },
      { $unwind: "$inventories" },
      { $match: { "inventories.size": new mongoose.Types.ObjectId(size) } },
      {
        $lookup: {
          from: "sizes",
          localField: "inventories.size",
          foreignField: "_id",
          as: "inventories.sizeDetail",
        },
      },
      {
        $unwind: "$inventories.sizeDetail",
      },
      {
        $group: {
          _id: "$_id",
          inventories: { $push: "$inventories" },
          color: { $first: "$color" },
          product: { $first: "$product" },
        },
      },
    ]);

    const stock = inventory[0]?.inventories[0]?.quantity || 0;

    if (stock === 0) {
      return NextResponse.json(
        { msg: "Sản phẩm đã hết hàng" },
        { status: 409 }
      );
    }

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
      if (userId) {
        cart = await Cart.findOne({ user: userId });
      }

      if (!cart && cartId && mongoose.Types.ObjectId.isValid(cartId)) {
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
      const totalQuantity = existingItem.quantity + quantity;

      if (totalQuantity > stock) {
        return NextResponse.json(
          { msg: `Bạn chỉ có thể mua tối đa ${stock} sản phẩm này.` },
          { status: 409 }
        );
      }

      existingItem.quantity = totalQuantity > 15 ? 15 : totalQuantity;
    } else {
      if (quantity > stock) {
        return NextResponse.json(
          { msg: `Sản phẩm chỉ còn ${stock} cái.` },
          { status: 409 }
        );
      }

      cart.items.push({
        variant: variant,
        size: size,
        quantity: quantity > 15 ? 15 : quantity,
      });
    }

    await cart.save();

    const response = NextResponse.json({ status: 201 });

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
