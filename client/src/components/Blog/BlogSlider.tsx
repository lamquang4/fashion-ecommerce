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
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {blogs.map((blog) => (
                <SwiperSlide
                  key={blog._id}
                  className=" group cursor-pointer shadow-md rounded-md border border-gray-100"
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <Image
                      Src={blog.image}
                      Alt={""}
                      ClassName="w-full overflow-hidden"
                      loadingType="lazy"
                    />

                    <div className="space-y-3 p-6">
                      <h4>{blog.title}</h4>

                      <p
                        className="text-gray-500 line-clamp-3 leading-relaxed"
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

                        <Link
                          href={`/blog/${blog.slug}`}
                          className="text-[0.9rem] font-medium group-hover:underline group-hover:underline-offset-3"
                        >
                          Đọc thêm
                        </Link>
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
