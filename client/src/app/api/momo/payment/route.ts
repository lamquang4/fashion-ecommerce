import { connectMongoDB } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import crypto from "crypto";
import axios from "axios";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { total, orderCode } = await req.json();

    const partnerCode = process.env.MOMO_PARTNERCODE;
    const accessKey = process.env.MOMO_ACCESSKEY;
    const secretKey = process.env.MOMO_SECRETKEY;
    const requestId = orderCode;
    const orderId = requestId;
    const orderInfo = "Thanh toán bằng Momo"; // nội dung giao dịch
    const redirectUrl = `${process.env.NEXTAUTH_URL}/api/momo/notification`;
    const ipnUrl = `${process.env.NEXTAUTH_URL}/api/momo/notification`;
    const amount = total;
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    const signature = crypto
      .createHmac("sha256", secretKey!)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });

    const response = await axios.post(
      `${process.env.MOMO_URL}/create`, // https://payment.momo.vn
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return NextResponse.json({ payUrl: response.data.payUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
