import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { formatDate } from "@/utils/formatDate"; // bạn đã có sẵn

export async function POST(req: NextRequest) {
  try {
    const { total, orderCode } = await req.json();

    const now = new Date();
    const expire = new Date(now.getTime() + 15 * 60 * 1000); // 15 phút
    const vnp_Amount = (total * 100).toString();

    const vnp_Params: Record<string, string> = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: process.env.VNPAY_TMN_CODE!,
      vnp_Amount,
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderCode.toString(),
      vnp_OrderInfo: `Thanh toán đơn hàng ${orderCode}`,
      vnp_OrderType: "other",
      vnp_Locale: "vn",
      vnp_ReturnUrl: `${process.env.NEXTAUTH_URL}/api/vnpay/check-payment`,
      vnp_CreateDate: formatDate(now),
      vnp_ExpireDate: formatDate(expire),
      vnp_IpAddr: "127.0.0.1",
    };

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc: Record<string, string>, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {});

    const signData = Object.entries(sortedParams)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    const hmac = crypto.createHmac("sha512", process.env.VNPAY_SECURE_SECRET!);
    const secureHash = hmac
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");

    const payUrl = `${process.env.VNPAY_URL}?${signData}&vnp_SecureHash=${secureHash}`;

    return NextResponse.json({
      message: "Tạo URL thanh toán thành công",
      payUrl,
    });
  } catch (error) {
    console.error("VNPay Payment Error:", error);
    return NextResponse.json(
      { message: "Lỗi khi tạo URL thanh toán VNPay" },
      { status: 500 }
    );
  }
}
