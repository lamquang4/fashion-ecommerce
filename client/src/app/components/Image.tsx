"use client";
import React from "react";
type ImageProps = {
  Src: string;
  Alt: string;
  ClassName: string;
};
function Image({ Src, Alt, ClassName }: ImageProps) {
  return <img src={Src} alt={Alt} className={ClassName} loading="lazy" />;
}

export default Image;
