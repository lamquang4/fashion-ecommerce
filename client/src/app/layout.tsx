import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutPage from "../components/layout/LayoutPage";
import { AuthProvider } from "./AuthProvider";
import ScrollToTop from "@/components/ScrollToTop";
import { Suspense } from "react";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://your-domain.com"),
  title: {
    default: "Aura - Thời trang nam nữ chính hãng",
    template: "%s | Aura",
  },
  description:
    "Aura - Cửa hàng thời trang quần áo nam nữ với đa dạng mẫu mã, chất lượng cao, giá tốt.",
  keywords: ["thời trang", "quần áo nam nữ", "aura", "shop quần áo"],
  authors: [{ name: "Aura Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Aura",
    title: "Aura - Thời trang nam nữ chính hãng",
    description:
      "Cửa hàng thời trang quần áo nam nữ với đa dạng mẫu mã, chất lượng cao.",
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: "Aura Fashion",
      },
    ],
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={quicksand.className}>
        <Toaster
          toastOptions={{
            style: {
              zIndex: 99,
            },
          }}
        />
        <Suspense>
          <ScrollToTop />
        </Suspense>
        <AuthProvider>
          <LayoutPage>{children}</LayoutPage>
        </AuthProvider>
      </body>
    </html>
  );
}
