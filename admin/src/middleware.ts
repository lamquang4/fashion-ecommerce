import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// xác thực người dùng trước khi truy cập các trang yêu cầu đăng nhập

const protectedRoutesByRole: Record<string, number[]> = {
  "/admin": [0],
  "/add-admin": [0],
  "/edit-admin": [0],
  "/customer": [0],
  "/add-customer": [0],
  "/edit-customer": [0],

  "/dashboard": [0, 1, 2],
  "/account": [0, 1, 2],

  "/order": [0, 1],
  "/order-detail": [0, 1],
  "/product": [0, 1],
  "/add-product": [0, 1],
  "/edit-product": [0, 1],
  "/inventory": [0, 1],
  "/coupon": [0, 1],
  "/add-coupon": [0, 1],
  "/edit-coupon": [0, 1],
  "/size": [0, 1],
  "/add-size": [0, 1],
  "/edit-size": [0, 1],
  "/color": [0, 1],
  "/add-color": [0, 1],
  "/edit-color": [0, 1],

  "/category": [0, 2],
  "/add-category": [0, 2],
  "/edit-category": [0, 2],
  "/promotebanner": [0, 2],
  "/mainbanner": [0, 2],
  "/add-mainbanner": [0, 2],
  "/collection": [0, 2],
  "/add-blog": [0, 2],
  "/blog": [0, 2],
  "/edit-blog": [0, 2],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.admin-session-token",
  });

  const { pathname } = req.nextUrl;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  for (const [route, roles] of Object.entries(protectedRoutesByRole)) {
    if (pathname.startsWith(route) && !roles.includes(token.role)) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/admin",
    "/size",
    "/color",
    "/product",
    "/inventory",
    "/category",
    "/coupon",
    "/customer",
    "/collection",
    "/order",
    "/promotebanner",
    "/mainbanner",
    "/order-detail/:path*",
    "/account",
    "/add-admin",
    "/add-category",
    "/add-color",
    "/add-coupon",
    "/add-customer",
    "/add-mainbanner",
    "/add-product",
    "/add-size",
    "/edit-product/:path*",
    "/edit-admin/:path*",
    "/edit-category/:path*",
    "/edit-color/:path*",
    "/edit-coupon/:path*",
    "/edit-customer/:path*",
    "/edit-size/:path*",
  ],
}; // những trang cần đăng nhập với được truy cập
