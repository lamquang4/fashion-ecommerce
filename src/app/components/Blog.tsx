"use client";
import Link from "next/link";
import React from "react";

function Blog() {
  return (
    <section className="px-[10px] mt-[30px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full m-[0_auto] md:max-w-[1000px] lg:max-w-[1240px]">
        <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
          Tin tức
        </h2>
        <div className="flex justify-start pb-[20px] items-center gap-[25px] overflow-x-auto overflow-y-hidden snap-x snap-mandatory overscroll-contain flex-nowrap scroll-smooth">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="group cursor-pointer min-w-[calc(100%/1.7)] lg:min-w-[calc(100%/3)] transition-all duration-300 snap-center"
              >
                <div className="flex items-center mb-5 overflow-hidden">
                  <Link href={"/"}>
                    <img
                      src="/assets/banner/banner-new.png"
                      alt=""
                      className="rounded-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </Link>
                </div>
                <div>
                  <h2 className="text-[0.9rem] sm:text-[1rem] text-gray-900 font-medium mb-2">
                    DỌN KHO HÈ CŨ - ĐÓN HÀNG MỚI VỀ
                  </h2>
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-[0.9rem] sm:text-[1rem] text-black font-normal">
                      19/3/2025
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
