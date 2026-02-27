"use client";

import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

type Props = {
  count: number;
};

function ProductSliderSkeleton({ count }: Props) {
  return (
    <Swiper
      spaceBetween={12}
      modules={[FreeMode]}
      freeMode={true}
      breakpoints={{
        0: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1640: { slidesPerView: 4 },
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <SwiperSlide key={index}>
          <div className="space-y-[15px] animate-pulse">
            <div className="relative">
              <div className="w-full pt-[100%] bg-gray-200 rounded relative" />
            </div>

            <div className="py-[12px] space-y-[10px]">
              <div className="flex gap-2 mb-[10px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5.5 h-5.5 bg-gray-200 rounded-full"
                  />
                ))}
              </div>

              <div className="space-y-2">
                <div className="w-full h-[16px] bg-gray-200 rounded" />
                <div className="w-[75%] h-[16px] bg-gray-200 rounded" />
              </div>

              <div className="w-[60%] h-[14px] bg-gray-200 rounded" />

              <div className="flex gap-[12px]">
                <div className="w-[80px] h-[18px] bg-gray-200 rounded" />
                <div className="w-[90px] h-[18px] bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default memo(ProductSliderSkeleton);
