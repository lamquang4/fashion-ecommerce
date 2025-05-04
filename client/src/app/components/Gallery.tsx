"use client";
import React from "react";
import Image from "./Image";
import Link from "next/link";
function Gallery() {
  return (
    <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
        <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
          Bộ sưu tập
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
          <div className="relative">
            <Image
              Src={"/assets/banner/men.png"}
              Alt={""}
              ClassName={"h-auto max-w-full"}
              loadingType="lazy"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h2 className="text-[2rem] mb-[10px] font-bold">NAM</h2>
              <Link
                className="text-[0.95rem] border border-white p-2 font-medium hover:scale-105"
                href={"/shop"}
              >
                KHÁM PHÁ NGAY
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              Src={"/assets/banner/women.png"}
              Alt={""}
              ClassName={"h-auto max-w-full"}
              loadingType="lazy"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h2 className="text-[2rem] mb-[10px] font-bold">NỮ</h2>
              <Link
                className="text-[0.95rem] border border-white p-2 font-medium hover:scale-105"
                href={"/shop"}
              >
                KHÁM PHÁ NGAY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
