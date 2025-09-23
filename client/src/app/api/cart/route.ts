import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Cart from "@/model/Cart";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import Inventory from "@/model/Inventory";

// lấy giỏ hàng
export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);
    const userId = session?.user?.id;

    const cartId = req.cookies.get("cart")?.value;

    let matchCondition: any = null;

    if (userId) {
      matchCondition = { user: new mongoose.Types.ObjectId(userId) };
    } else if (cartId) {
      matchCondition = { _id: new mongoose.Types.ObjectId(cartId) };
    }

    if (!matchCondition) {
      return NextResponse.json(
        {
          msg: "Không biết",
        },
        { status: 400 }
      );
    }

    const cart = await Cart.aggregate([
      { $match: matchCondition },

      { $unwind: "$items" },

      {
        $lookup: {
          from: "inventories",
          localField: "items.variant",
          foreignField: "_id",
          as: "variantData",
        },
      },
      { $unwind: "$variantData" },
      {
        $addFields: {
          inventoriesMatched: {
            $filter: {
              input: "$variantData.inventories",
              as: "inv",
              cond: {
                $eq: ["$$inv.size", "$items.size"],
              },
            },
          },
        },
      },
      {
        $addFields: {
          matchedInventory: { $arrayElemAt: ["$inventoriesMatched", 0] },
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "variantData.product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },

      {
        $lookup: {
          from: "colors",
          localField: "variantData.color",
          foreignField: "_id",
          as: "colorData",
        },
      },
      { $unwind: "$colorData" },

      {
        $lookup: {
          from: "sizes",
          localField: "items.size",
          foreignField: "_id",
          as: "sizeData",
        },
      },
      { $unwind: "$sizeData" },

      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          productsInCart: {
            $push: {
              _id: "$productData._id",
              name: "$productData.name",
              slug: "$productData.slug",
              price: "$productData.price",
              discount: "$productData.discount",
              variant: {
                _id: "$variantData._id",
                images: "$variantData.images",
                stock: "$matchedInventory.quantity",
                color: {
                  _id: "$colorData._id",
                  namecolor: "$colorData.namecolor",
                  codecolor: "$colorData.codecolor",
                },
                size: {
                  _id: "$sizeData._id",
                  namesize: "$sizeData.namesize",
                },
                quantity: "$items.quantity", // số lượng mua
              },
            },
          },
        },
      },
    ]);

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(cart[0], { status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}

// thêm biến thể của sản phẩm đó vào giỏ hàng
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


// xóa biến thể của sản phẩm đó khỏi giỏ hàng
export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();

    const { cartId, variant, size } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter(
      (item: any) =>
        item.variant.toString() !== variant || item.size.toString() !== size
    );

    await cart.save();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}


