"use client";
import Link from "next/link";
import React from "react";
import Image from "./Image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InputImage from "./InputImage";
import { FaRegEyeSlash } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
function Home() {
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
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Trang chính
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Banner chính desktop
              </p>

              <InputImage
                isAlotImage={true}
                InputId="desktop-banner"
                arrayImg={[]}
              />

              <div className="w-full mx-auto max-w-[600px] ">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true, type: "bullets" }}
                  loop={false}
                  speed={1000}
                >
                  {bannerCarousels.map((banner, index) => (
                    <SwiperSlide key={index}>
                      <div>
                        <Image
                          Src={banner.imgDesktop}
                          Alt={""}
                          ClassName={"w-full object-cover"}
                        />
                        <div className="absolute top-[10px] right-[10px] flex gap-3 items-center bg-white border p-1">
                          <button>
                            <FaRegEyeSlash
                              size={22}
                              className="text-[#74767d]"
                            />
                            {/*
                             <MdOutlineRemoveRedEye
                                                      size={22}
                                                      className="text-[#74767d]"
                                                    />
                                              */}
                          </button>

                          <button>
                            <VscTrash size={22} className="text-[#d9534f]" />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Banner chính mobile
              </p>

              <InputImage
                isAlotImage={true}
                InputId="mobile-banner"
                arrayImg={[]}
              />

              <div className="w-full mx-auto max-w-[250px] ">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true, type: "bullets" }}
                  loop={false}
                  speed={1000}
                >
                  {bannerCarousels.map((banner, index) => (
                    <SwiperSlide key={index}>
                      <div>
                        <Image
                          Src={banner.imgMobile}
                          Alt={""}
                          ClassName={"w-full object-cover"}
                        />
                        <div className="absolute top-[10px] right-[10px] flex gap-3 items-center bg-white border p-1">
                          <button>
                            <FaRegEyeSlash
                              size={22}
                              className="text-[#74767d]"
                            />
                            {/*
                             <MdOutlineRemoveRedEye
                                                      size={22}
                                                      className="text-[#74767d]"
                                                    />
                                              */}
                          </button>

                          <button>
                            <VscTrash size={22} className="text-[#d9534f]" />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              type="submit"
              className="px-[14px] py-[5px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
            >
              Thêm
            </button>
            <Link
              href="/color"
              className="px-[14px] py-[10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Home;
