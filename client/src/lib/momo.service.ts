import crypto from "crypto";
import axios from "axios";
import { momoConfig } from "./config/momo.config";

export async function createPayment({ orderCode, total }: any) {
  const {
    partnerCode,
    accessKey,
    secretKey,
    momoUrl,
    redirectUrl,
    ipnUrl,
    requestType,
  } = momoConfig;

  const requestId = orderCode;
  const orderId = requestId;
  const orderInfo = "Thanh toán bằng Momo";
  const amount = total;
  const extraData = "";

  const rawSignature =
    `accessKey=${accessKey}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&ipnUrl=${ipnUrl}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&partnerCode=${partnerCode}` +
    `&redirectUrl=${redirectUrl}` +
    `&requestId=${requestId}` +
    `&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: "en",
  });

  const response = await axios.post(momoUrl, requestBody, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
}

export async function refundPayment({ transId, amount, orderId }: any) {
  const { partnerCode, accessKey, secretKey, refundUrl } = momoConfig;

  const refundOrderId = `${orderId}_REFUND_${Date.now()}`;
  const requestId = crypto.randomUUID();
  const description = "Hoàn tiền";

  const rawSignature =
    `accessKey=${accessKey}` +
    `&amount=${amount}` +
    `&description=${description}` +
    `&orderId=${refundOrderId}` +
    `&partnerCode=${partnerCode}` +
    `&requestId=${requestId}` +
    `&transId=${transId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId: refundOrderId,
    transId,
    lang: "en",
    description,
    signature,
  };

  const response = await axios.post(refundUrl, requestBody);
  return response.data;
}
