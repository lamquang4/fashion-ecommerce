"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
type prop = {
  height: number;
};
function Loading({ height }: prop) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: `${height}vh` }}
    >
      <ClipLoader color={"black"} size={55} />
    </div>
  );
}

export default Loading;
