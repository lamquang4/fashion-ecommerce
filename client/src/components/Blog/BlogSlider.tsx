"use client";
import Link from "next/link";
import Image from "../Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { CiCalendar } from "react-icons/ci";
import { Blog } from "@/types/type";
type Props = {
  title: string;
  blogs: Blog[];
};
function BlogSlider({ title, blogs }: Props) {
  return (
    <>
      {blogs?.length > 0 && (
        <section className="mb-[40px] px-[10px] sm:px-[15px]">
          <div className="mx-auto max-w-[1230px] w-full">
            <h2 className="mb-[20px]">{title}</h2>
            <Swiper
              spaceBetween={16}
              modules={[FreeMode]}
              freeMode={true}
              breakpoints={{
                0: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {blogs.map((blog) => (
                <SwiperSlide
                  key={blog._id}
                  className=" group cursor-pointer h-auto rounded-md shadow-md"
                >
                  <Link href={`/blog/${blog.slug}`} className="h-full">
                    <div className="w-full aspect-[16/9] overflow-hidden">
                      <Image
                        Src={blog.image}
                        Alt={blog.title}
                        ClassName="w-full h-full object-cover"
                        loadingType="lazy"
                      />
                    </div>

                    <div className="flex flex-col flex-grow space-y-3 py-6 px-[15px] leading-relaxed">
                      <h5 className="font-semibold">{blog.title}</h5>

                      <p
                        className="text-gray-500 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: blog?.summary || "",
                        }}
                      />

                      <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                        <div className="text-gray-500 flex items-center gap-1">
                          <CiCalendar size={18} />{" "}
                          <span>
                            {new Date(blog.createdAt).toLocaleString("vi-VN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="text-[0.9rem] font-medium group-hover:underline group-hover:underline-offset-3"
                        >
                          Đọc thêm
                        </button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}

export default BlogSlider;
