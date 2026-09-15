export const momoConfig = {
  partnerCode: process.env.MOMO_PARTNERCODE!,
  accessKey: process.env.MOMO_ACCESSKEY!,
  secretKey: process.env.MOMO_SECRETKEY!,
  momoUrl: process.env.MOMO_URL!,
  refundUrl: process.env.MOMO_REFUND_URL!,
  redirectUrl: `${process.env.NEXTAUTH_URL}/api/momo/notification`,
  ipnUrl: `${process.env.NEXTAUTH_URL}/api/momo/notification`,
  requestType: "captureWallet",
};
