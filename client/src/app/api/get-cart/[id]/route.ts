import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import User from "@/model/User";
import Cart from "@/model/Cart";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(options);

    if (!session || !session.user?.id) {
      // User chưa đăng nhập → frontend dùng localStorage
      return NextResponse.json(
        {
          productsInCart: [],
          total: 0,
        },
        { status: 200 }
      );
    }

    // Lấy user
    const user = await User.findById(session.user?.id);
    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    const cart = await Cart.findOne({ user: user._id })
      .populate({
        path: "items.inventory",
        populate: [
          { path: "product", model: "Product" },
          { path: "color", model: "Color" },
        ],
      })
      .populate("items.size");

    if (!cart) {
      return NextResponse.json(
        { productsInCart: [], total: 0 },
        { status: 200 }
      );
    }

    const productsInCart = cart.items.map((item: any) => {
      const inventory = item.inventory;
      const product = inventory.product;

      return {
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        slug: product.slug,
        variant: {
          _id: inventory._id.toString(),
          images: inventory.images,
          color: inventory.color, // có thể sửa tùy bạn define Color
          size: item.size, // đã populate size
          quantity: item.quantity,
        },
      };
    });

    return NextResponse.json(
      {
        _id: cart._id.toString(),
        user: cart.user.toString(),
        productsInCart,
        total: cart.total,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Lỗi server", error: err },
      { status: 500 }
    );
  }
}
