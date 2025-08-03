"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
type prop = {
  height: number;
  size: number;
  color: string;
};
function Loading({ height, size, color }: prop) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: `${height}vh` }}
    >
      <ClipLoader color={color} size={size} />
    </div>
  );
}

export default Loading;
