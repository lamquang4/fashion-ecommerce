import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthProvider";
import ScrollToTop from "@/components/ScrollToTop";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Quần áo cho nam và nữ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Toaster
          toastOptions={{
            style: {
              zIndex: 99,
            },
          }}
        />
        <ScrollToTop />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
