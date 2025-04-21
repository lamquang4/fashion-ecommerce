"use client";
import React from "react";

type OverplayProps = {
  closeMenu: () => void;
  IndexForZ: number;
};
function Overplay({ closeMenu, IndexForZ }: OverplayProps) {
  const handleOverlayClick = () => {
    if (closeMenu) closeMenu();
  };
  console.log(IndexForZ);
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/50 opacity-100 pointer-events-auto transition ease-in-out duration-500"
      style={{ zIndex: IndexForZ }}
      onClick={handleOverlayClick}
    ></div>
  );
}

export default Overplay;
