import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { formatDate } from "@/utils/formatDate";

export async function POST(req: NextRequest) {
  try {
    const { total, orderCode } = await req.json();

    // hết hạn sau 1 tiếng rưỡi
    const now = new Date();
    const expire = new Date(now.getTime() + 90 * 60 * 1000);

    const vnp_Amount = (total * 100).toString();

    const vnpParams: Record<string, string> = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: process.env.VNPAY_TMN_CODE!,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderCode.toString(),
      vnp_OrderInfo: `Thanh toán đơn hàng ${orderCode}`,
      vnp_OrderType: "other",
      vnp_Amount,
      vnp_ReturnUrl: `${process.env.NEXTAUTH_URL}/api/vnpay/notification`,
      vnp_IpAddr: "127.0.0.1",
      vnp_CreateDate: formatDate(now),
      vnp_ExpireDate: formatDate(expire),
    };

    const sortedParams = Object.keys(vnpParams)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnpParams[key];
        return acc;
      }, {} as Record<string, string>);

    const signData = new URLSearchParams(sortedParams).toString();

    const hmac = crypto.createHmac("sha512", process.env.VNPAY_SECURE_SECRET!);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    sortedParams["vnp_SecureHash"] = signed;

    const paymentUrl =
      process.env.VNP_URL + "?" + new URLSearchParams(sortedParams).toString();

    return NextResponse.json({ payUrl: paymentUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}
