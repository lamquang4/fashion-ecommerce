import { connectMongoDB } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import crypto from "crypto";
import axios from "axios";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { total, paymethod } = await req.json();

    if (paymethod === 1) {
      const partnerCode = process.env.MOMO_PARTNERCODE;
      const accessKey = process.env.MOMO_ACCESSKEY;
      const secretKey = process.env.MOMO_SECRETKEY;
      const requestId = partnerCode! + new Date().getTime();
      const orderId = requestId;
      const orderInfo = "Thanh toán bằng Momo"; // nội dung giao dịch
      const redirectUrl = `${process.env.NEXTAUTH_URL}/checkout`;
      const ipnUrl = `${process.env.NEXTAUTH_URL}/api/momo/notify/${orderId}`;
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
        "https://test-payment.momo.vn/v2/gateway/api/create", // https://payment.momo.vn
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ status: 404 });
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
