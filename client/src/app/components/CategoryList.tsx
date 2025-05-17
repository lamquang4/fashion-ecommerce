"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "./Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

interface CategoryItem {
  name: string;
  count: number;
  img: string;
}

const categories: Record<string, CategoryItem[]> = {
  Nam: [
    { name: "Áo sơ mi", count: 3, img: "/assets/other/aosomi.png" },
    { name: "Áo khoác", count: 5, img: "/assets/other/aokhoac.png" },
  ],
  Nữ: [
    { name: "Váy", count: 7, img: "/assets/other/vay.png" },
    { name: "Đầm", count: 4, img: "/assets/other/dam.png" },
  ],
};

function CategoryList() {
  const [selectedGender, setSelectedGender] = useState<string>("Nam");

  return (
    <section className="px-[10px] sm:px-[15px] mt-[40px] sm:mt-[45px]">
      <div className="w-full m-[0_auto] md:max-w-[1000px] lg:max-w-[1240px]">
        <div className="flex justify-center mb-5">
          {["Nam", "Nữ"].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`relative w-[120px] text-[1.2rem] uppercase font-medium pb-1 transition-all duration-300 ease-in-out
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px]
    after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out
    ${
      selectedGender === gender
        ? "text-red-500 after:w-full"
        : "text-gray-500 after:w-0"
    }
  `}
            >
              {gender}
            </button>
          ))}
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={"auto"}
          freeMode={true}
          modules={[FreeMode]}
          className="mx-auto w-fit"
        >
          {categories[selectedGender].map((item, index) => (
            <SwiperSlide
              key={index}
              className="!flex !flex-col !items-center !w-[90px] sm:!w-[110px]"
            >
              <Link href={"/"}>
                <div className="mb-[8px]">
                  <Image
                    Src={item.img}
                    Alt={item.name}
                    ClassName="block w-[90px] sm:w-[110px] object-cover"
                    loadingType="eager"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[0.85rem] uppercase font-medium">
                      {item.name}
                    </h3>
                    <p className="text-black text-[0.85rem] font-medium">
                      ({item.count})
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default CategoryList;
