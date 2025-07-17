import { connectMongoDB } from "@/lib/MongoConnect";
import Cart from "@/model/Cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const { cartId, productId, variantId, sizeId, quantity } = body;

    const cart = await Cart.findById(cartId);
    if (!cart)
      return NextResponse.json(
        { msg: "Giỏ hàng không tồn tại" },
        { status: 404 }
      );

    const existingItem = cart.items.find(
      (item: any) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId &&
        item.size.toString() === sizeId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        variant: variantId,
        size: sizeId,
        quantity,
      });
    }

    // Cập nhật tổng tiền (nếu muốn)
    // cart.total = ... (tuỳ logic)

    await cart.save();

    return NextResponse.json({ msg: "Thêm thành công" });
  } catch (err) {
    return NextResponse.json(
      { error: err, msg: "Lỗi thêm sản phẩm" },
      { status: 500 }
    );
  }
}
