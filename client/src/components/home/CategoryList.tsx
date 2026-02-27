"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "../ui/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Category } from "@/types/type";
import CategoryListSkeleton from "../skeleton/CategoryListSkeleton";

type Props = {
  categoriesMale: Category[];
  categoriesFemale: Category[];
  isLoading: boolean;
};

function CategoryList({ categoriesMale, categoriesFemale, isLoading }: Props) {
  const [selectedGender, setSelectedGender] = useState<number>(1);

  const categories = selectedGender === 1 ? categoriesMale : categoriesFemale;
  return (
    <section className="mb-[40px] px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <div className="flex justify-center mb-[20px]">
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
              {gender === 1 ? "Nam" : gender === 0 ? "Nữ" : ""}
            </button>
          ))}
        </div>

        {isLoading ? (
          <CategoryListSkeleton count={6} />
        ) : (
          <div className="flex justify-center">
            <Swiper
              spaceBetween={20}
              slidesPerView={"auto"}
              modules={[FreeMode]}
              grabCursor={true}
            >
              {categories.map((category) => (
                <SwiperSlide
                  key={category._id}
                  className="!flex !flex-col !items-center !w-auto group"
                >
                  <Link
                    href={`/collection/${category.slug}`}
                    className="space-y-[8px]"
                  >
                    <div className="w-[110px] sm:w-[130px] border-gray-300 border rounded-full group-hover:border-black">
                      <Image
                        src={category.image}
                        alt={category.namecategory}
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-center">
                      <h5 className="font-medium">{category.namecategory} </h5>
                      <p className="font-normal">
                        ({category.productCount} sản phẩm)
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoryList;
