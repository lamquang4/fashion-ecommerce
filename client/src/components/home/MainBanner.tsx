"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "../ui/Image";
import { Banner } from "@/types/type";
import MainBannerSkeleton from "../skeleton/MainBannerSkeleton";
type Props = {
  banners1: Banner[];
  banners2: Banner[];
  isLoading: boolean;
};
function MainBanner({ banners1, banners2, isLoading }: Props) {
  if (isLoading) {
    return <MainBannerSkeleton />;
  }
  return (
    <>
      {(banners1.length > 0 || banners2.length > 0) && (
        <section className="mb-[40px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true, type: "bullets" }}
            autoplay={{ delay: 5000 }}
            loop={true}
            speed={1000}
            className="w-full"
          >
            {banners1.map((banner1, index) => (
              <SwiperSlide key={banner1._id}>
                <div className="relative block w-full">
                  <div className="w-full">
                    <picture>
                      {banners2[index] && (
                        <source
                          srcSet={banners2[index].image}
                          media="(max-width: 640px)"
                        />
                      )}

                      <Image
                        src={banner1.image}
                        alt={"banner"}
                        className={"w-full"}
                        loading="eager"
                      />
                    </picture>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                      <h2 className="uppercase mb-5 text-white">
                        Thời trang hiện đại
                      </h2>
                      <div className="flex gap-7 justify-center items-center">
                        <Link
                          href={"/collection/nu"}
                          className="w-[85px] py-[7.5px] md:w-[90px]  bg-white   text-[0.9rem] font-bold uppercase hover:scale-105"
                        >
                          Nữ
                        </Link>
                        <Link
                          href={"/collection/nam"}
                          className="w-[85px] py-[7.5px] md:w-[90px]  bg-white   text-[0.9rem] font-bold uppercase hover:scale-105"
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
        </section>
      )}
    </>
  );
}

export default MainBanner;
