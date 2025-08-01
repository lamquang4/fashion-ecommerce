import { connectMongoDB } from "@/lib/MongoConnect";
import Order from "@/model/Order";
import { validatePhone } from "@/utils/validatePhone";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import OrderDetail from "@/model/OrderDetail";
import Inventory from "@/model/Inventory";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const {
      fullname,
      phone,
      speaddress,
      city,
      ward,
      paymethod,
      coupon,
      total,
      productsBuy,
    } = await req.json();

    const session = await getServerSession(options);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { msg: "Người dùng chưa đăng nhập" },
        { status: 400 }
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { msg: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    const generateOrderCode = () =>
      (Math.random().toString(36) + Math.random().toString(36))
        .substring(2, 12)
        .toUpperCase();

    let orderCode = generateOrderCode();
    while (await Order.exists({ orderCode })) {
      orderCode = generateOrderCode();
    }

    const newOrderData: any = {
      orderCode,
      user: userId,
      fullname,
      phone,
      speaddress,
      city,
      ward,
      paymethod,
      total,
      status: 0,
    };

    if (coupon) {
      newOrderData.coupon = coupon;
    }

    const newOrder = await Order.create(newOrderData);

    await OrderDetail.create({
      order: newOrder._id,
      items: productsBuy,
    });

    // Cập nhật tồn kho
    for (const item of productsBuy) {
      const { product, color, size, quantity } = item;

      const inventory = await Inventory.findOne({
        product,
        color,
      });

      if (inventory) {
        const inventoryItem = inventory.inventories.find(
          (inv: any) => inv.size.toString() === size
        );

        if (inventoryItem) {
          inventoryItem.quantity -= quantity;
          if (inventoryItem.quantity < 0) inventoryItem.quantity = 0;
        }

        await inventory.save();
      }
    }

    return NextResponse.json({ order: newOrder }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
