export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/account",
    "/order",
    "/address",
    "/checkout",
    "/order-detail/:path*",
  ],
}; // những trang cần đăng nhập với được truy cập
