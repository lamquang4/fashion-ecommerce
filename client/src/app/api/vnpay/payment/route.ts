import { createPayment } from "@/lib/Vnpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { total, orderCode } = await req.json();

    const vnpay = await createPayment({ orderCode, total });

    return NextResponse.json(
      {
        payUrl: vnpay,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Lỗi", err }, { status: 500 });
  }
}
