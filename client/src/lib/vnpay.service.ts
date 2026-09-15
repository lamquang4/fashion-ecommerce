import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";
import { vnpayConfig } from "./config/vnpay.config";

const vnpay = new VNPay({
  tmnCode: vnpayConfig.tmnCode,
  secureSecret: vnpayConfig.secureSecret,
  vnpayHost: vnpayConfig.vnpayUrl,
  testMode: vnpayConfig.testMode,
  hashAlgorithm: "SHA512" as any,
  enableLog: true,
  loggerFn: ignoreLogger,
});

export async function createPayment({
  orderCode,
  total,
}: {
  orderCode: string;
  total: number;
}) {
  const now = new Date();
  const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const expire = new Date(vnTime.getTime() + 90 * 60 * 1000); // 1 tiếng rưỡi

  const payUrl = vnpay.buildPaymentUrl({
    vnp_Amount: total,
    vnp_IpAddr: "127.0.0.1",
    vnp_TxnRef: orderCode,
    vnp_OrderInfo: orderCode,
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: vnpayConfig.returnUrl,
    vnp_Locale: VnpLocale.VN,
    vnp_CreateDate: dateFormat(vnTime),
    vnp_ExpireDate: dateFormat(expire),
  });

  return payUrl;
}
