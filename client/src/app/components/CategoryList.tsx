"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "./Image";
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
        <div className="flex justify-center gap-10 mb-5">
          {["Nam", "Nữ"].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender as "Nam" | "Nữ")}
              className={`w-[120px] text-[1.2rem] uppercase font-medium pb-1 ${
                selectedGender === gender
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>

        <Swiper
          modules={[Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          speed={1000}
        >
          <SwiperSlide>
            <div className="flex justify-center items-center gap-[50px] overflow-x-auto overflow-y-hidden snap-x snap-mandatory overscroll-contain">
              {categories[selectedGender].map(
                (item: CategoryItem, index: number) => (
                  <div
                    className="flex flex-col items-center gap-[10px] snap-center"
                    key={index}
                  >
                    <Link href={"/"}>
                      <div className="mb-[8px]">
                        <Image
                          Src={item.img}
                          Alt={item.name}
                          ClassName={"block w-[90px] sm:w-[110px] object-cover"}
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
                  </div>
                )
              )}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default CategoryList;
