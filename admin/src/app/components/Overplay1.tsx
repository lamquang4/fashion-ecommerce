"use client";
import React from "react";

type OverplayProp = {
  closeMenu: () => void;
};
function Overplay1({ closeMenu }: OverplayProp) {
  const handleOverlayClick = () => {
    if (closeMenu) closeMenu();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/50 opacity-100 pointer-events-auto transition ease-in-out duration-500 z-99"
      onClick={handleOverlayClick}
    ></div>
  );
}

export default Overplay1;
