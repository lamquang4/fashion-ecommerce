import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Cart from "@/model/Cart";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);
    const userId = session?.user?.id;

    const cartId = req.cookies.get("cart")?.value;

    let matchCondition: any = null;

    if (cartId && mongoose.Types.ObjectId.isValid(cartId)) {
      matchCondition = { _id: new mongoose.Types.ObjectId(cartId) };
    } else if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      matchCondition = { user: new mongoose.Types.ObjectId(userId) };
    } else {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    const cartData = await Cart.aggregate([
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

    if (!cartData || cartData.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy giỏ hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json(cartData[0]);
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}
