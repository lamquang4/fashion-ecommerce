"use client";
import Link from "next/link";
import React from "react";

function Gallery() {
  return (
    <section className="px-[10px] mt-[30px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
        <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
          Bộ sưu tập
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="/assets/banner/men.png"
                alt=""
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="/assets/banner/women.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
