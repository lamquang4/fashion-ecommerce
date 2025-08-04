import { connectMongoDB } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    await connectMongoDB();

    const { orderId } = await params;

    var partnerCode = process.env.MOMO_PARTNERCODE;
    var accessKey = process.env.MOMO_ACCESSKEY;
    var secretKey = process.env.MOMO_SECRETKEY;
    const requestId = orderId;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;
    const signature = crypto
      .createHmac("sha256", secretKey!)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      requestId,
      orderId,
      signature,
      lang: "vi",
    };

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/query",
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Lỗi", err }, { status: 400 });
  }
}
