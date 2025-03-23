"use client";
import React from "react";

function Overplay({ closeMenu, closeSearch }: any) {
  const handleOverlayClick = () => {
    if (closeMenu) closeMenu();
    if (closeSearch) closeSearch();
  };
  const overlayClass = `fixed top-0 z-20 left-0 w-full h-screen bg-black/50 opacity-100 pointer-events-auto transition ease-in-out duration-500 ${
    closeMenu ? "z-[18]" : ""
  } ${closeSearch ? "z-[12]" : ""}`;
  return <div className={overlayClass} onClick={handleOverlayClick}></div>;
}

export default Overplay;
