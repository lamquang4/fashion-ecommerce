"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <ClipLoader color={"black"} size={55} />
    </div>
  );
}

export default Loading;
