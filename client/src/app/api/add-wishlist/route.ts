import { connectMongoDB } from "@/lib/MongoConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Wishlist from "@/model/Wishlist";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);
    const userId = session?.user?.id || null;

    const { variant } = await req.json();
    const wishlistId = req.cookies.get("wishlist")?.value;

    let wishlist = null;

    if (userId && wishlistId && mongoose.Types.ObjectId.isValid(wishlistId)) {
      const guestWishlist = await Wishlist.findById(wishlistId);
      const userWishlist = await Wishlist.findOne({ user: userId });

      if (guestWishlist && guestWishlist.user == null) {
        if (userWishlist) {
          for (const item of guestWishlist.items) {
            const exists = userWishlist.items.some(
              (it: any) => it.variant.toString() === item.variant.toString()
            );
            if (!exists) userWishlist.items.push(item);
          }

          await userWishlist.save();
          await Wishlist.findByIdAndDelete(guestWishlist._id);
          wishlist = userWishlist;
        } else {
          guestWishlist.user = userId;
          await guestWishlist.save();
          wishlist = guestWishlist;
        }
      }
    }

    if (!wishlist) {
      if (userId) {
        wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
          wishlist = await Wishlist.create({ user: userId, items: [] });
        }
      } else if (wishlistId && mongoose.Types.ObjectId.isValid(wishlistId)) {
        wishlist = await Wishlist.findById(wishlistId);
      }

      if (!wishlist) {
        wishlist = await Wishlist.create({ user: null, items: [] });
      }
    }

    const alreadyExists = wishlist.items.some(
      (item: any) => item.variant.toString() === variant
    );

    if (!alreadyExists) {
      wishlist.items.push({ variant });
      await wishlist.save();
    }

    const response = NextResponse.json({ status: 200 });

    if (!userId && !wishlistId) {
      response.cookies.set({
        name: "wishlist",
        value: String(wishlist._id),
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }

    if (userId && wishlistId) {
      response.cookies.set({
        name: "wishlist",
        value: "",
        path: "/",
        expires: new Date(0),
      });
    }

    return response;
  } catch (err) {
    return NextResponse.json({ msg: "Lỗi server", err }, { status: 500 });
  }
}
