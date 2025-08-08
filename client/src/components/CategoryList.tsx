"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "./Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import useGetCategories from "@/hooks/useGetCategories";

function CategoryList() {
  const [selectedGender, setSelectedGender] = useState<number>(1);
  const { categoriesMale, categoriesFemale } = useGetCategories();

  const categories = selectedGender === 1 ? categoriesMale : categoriesFemale;
  return (
    <section className="px-[10px] sm:px-[15px] mt-[40px] sm:mt-[45px]">
      <div className="w-full m-[0_auto] md:max-w-[1000px] lg:max-w-[1240px]">
        <div className="flex justify-center mb-5">
          {[1, 0].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`relative w-[150px] py-3.5 text-[1.2rem] uppercase font-medium transition-all duration-300 ease-in-out
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px]
    after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out
    ${
      selectedGender === gender
        ? "text-red-500 after:w-full"
        : "text-gray-500 after:w-0"
    }
  `}
            >
              {gender === 1 ? "Nam" : "Nữ"}
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
          {categories.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!flex !flex-col !items-center !w-[90px] sm:!w-[110px]"
            >
              <Link href={`/collection/${item.slug}`}>
                <div className="mb-[8px]">
                  <Image
                    Src={item.image}
                    Alt={item.namecategory}
                    ClassName="block w-[90px] sm:w-[110px] object-cover"
                    loadingType="eager"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-center items-center">
                    <h3 className="text-[0.85rem] uppercase font-medium">
                      {item.namecategory} ({item.productCount})
                    </h3>
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
