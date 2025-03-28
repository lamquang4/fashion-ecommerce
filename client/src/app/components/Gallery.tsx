"use client";
import React from "react";
import Image from "./Image";
function Gallery() {
  return (
    <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
        <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
          Bộ sưu tập
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-4">
            <div>
              <Image
                Src={"/assets/banner/men.png"}
                Alt={""}
                ClassName={"h-auto max-w-full rounded-lg"}
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Image
                Src={"/assets/banner/women.png"}
                Alt={""}
                ClassName={"h-auto max-w-full rounded-lg"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
