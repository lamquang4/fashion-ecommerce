"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
type prop = {
  height: number;
  size: number;
  color: string;
  thickness: number;
};
function Loading({ height, size, color, thickness }: prop) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: `${height}vh` }}
    >
      <ClipLoader
        color={color}
        size={size}
        cssOverride={{
          borderWidth: `${thickness}px`,
        }}
      />
    </div>
  );
}

export default Loading;
