"use client";
import React from "react";
import Overplay1 from "./Overplay1";
import Image from "./Image";
import { HiMiniXMark } from "react-icons/hi2";
type ImageViewerProps = {
  imgSrc: string;
  closeMenu: () => void;
};
function ImageViewer({ imgSrc, closeMenu }: ImageViewerProps) {
  return (
    <div className="relative w-full h-full block">
      <button
        className="fixed top-[20px] right-[20px] z-100 bg-white rounded-full flex justify-center items-center border-2"
        onClick={closeMenu}
      >
        <HiMiniXMark size={34} />
      </button>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
        <div className="flex justify-center items-center">
          <Image Src={imgSrc} Alt={""} ClassName={" w-full max-w-[50%]"} />
        </div>
      </div>

      <Overplay1 closeMenu={closeMenu} />
    </div>
  );
}

export default ImageViewer;
