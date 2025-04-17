"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import React from "react";
import Image from "./Image";
function BannerCarousel() {
  const bannerCarousels = [
    {
      imgDesktop: "/assets/banner/banner1-desktop.png",
      imgMobile: "/assets/banner/banner1-mobile.png",
    },
    {
      imgDesktop: "/assets/banner/banner-desktop.png",
      imgMobile: "/assets/banner/banner-mobile.png",
    },
  ];
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        speed={1000}
        className="w-full"
      >
        {bannerCarousels.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative block w-full">
              <div className="w-full">
                <picture>
                  <source
                    srcSet={banner.imgMobile}
                    media="(max-width: 640px)"
                  />
                  <Image
                    Src={banner.imgDesktop}
                    Alt={""}
                    ClassName={"w-full object-cover"}
                  />
                </picture>

                <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                  <h2 className="text-[1.6rem] md:text-[1.8rem] uppercase font-bold mb-5">
                    Thời trang hiện đại
                  </h2>
                  <div className="flex gap-7 justify-center items-center">
                    <Link
                      href={"/shop"}
                      className="w-[85px] py-[7.5px] md:w-[90px]  bg-white text-black text-[0.95rem] font-bold uppercase hover:scale-105"
                    >
                      Nữ
                    </Link>
                    <Link
                      href={"/shop"}
                      className="w-[85px] py-[7.5px] md:w-[90px]  bg-white text-black text-[0.95rem] font-bold uppercase hover:scale-105"
                    >
                      Nam
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default BannerCarousel;
