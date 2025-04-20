"use client";
import React, { ReactNode, useEffect, useState } from "react";
import MenuSide from "./MenuSide";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

function LayoutPage({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex h-auto w-full">
      <MenuSide menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className="w-full">
        <Header toggleMenu={toggleMenu} />
        {children}
      </main>
    </div>
  );
}

export default LayoutPage;
