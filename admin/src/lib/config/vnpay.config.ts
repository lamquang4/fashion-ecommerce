export const vnpayConfig = {
  tmnCode: process.env.VNPAY_TMN_CODE!,
  secureSecret: process.env.VNPAY_SECURE_SECRET!,
  vnpayUrl: process.env.VNPAY_URL!,
  returnUrl: `${process.env.NEXTAUTH_URL}/api/vnpay/notification`,
  testMode: process.env.NODE_ENV !== "production",
};
