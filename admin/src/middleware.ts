export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/user",
    "/admin",
    "/size",
    "/color",
    "/product",
    "/inventory",
    "/account",
  ],
}; // những trang cần đăng nhập với được truy cập
