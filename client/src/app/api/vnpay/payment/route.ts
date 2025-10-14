import { NextRequest, NextResponse } from "next/server";

import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";

export async function POST(req: NextRequest) {
  try {
    const { total, orderCode } = await req.json();

    const vnpay = await new VNPay({
      tmnCode: process.env.VNPAY_TMN_CODE!,
      secureSecret: process.env.VNPAY_SECURE_SECRET!,
      vnpayHost: process.env.VNPAY_URL!,
      testMode: true,
      hashAlgorithm: "SHA512" as any,
      enableLog: true,
      loggerFn: ignoreLogger,
    });

    const now = new Date();
    const expire = new Date(now.getTime() + 90 * 60 * 1000); // 1 tiếng rưỡi

    const resVnpay = vnpay.buildPaymentUrl({
      vnp_Amount: total,
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: orderCode,
      vnp_OrderInfo: orderCode,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: `${process.env.NEXTAUTH_URL}/api/vnpay/notification`,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(now),
      vnp_ExpireDate: dateFormat(expire),
    });

    return NextResponse.json(
      {
        payUrl: resVnpay,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Lỗi", err }, { status: 500 });
  }
}
