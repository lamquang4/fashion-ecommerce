"use client";
import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import Footer from "./Footer";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPage = pathname === "/checkout";

  return (
    <>
      {!isPage && <Header />}
      {children}
      {!isPage && <Footer />}
    </>
  );
}
