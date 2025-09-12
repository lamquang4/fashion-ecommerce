"use client";
import Link from "next/link";
import Image from "./Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { CiCalendar } from "react-icons/ci";
import { Blog } from "@/types/type";
type Prop = {
  title: string;
  blogs: Blog[];
};
function BlogSlider({ title, blogs }: Prop) {
  return (
    <>
      {blogs?.length > 0 && (
        <section className="mb-[40px]">
          <div className="mx-auto max-w-[1230px] w-full px-[10px] sm:px-[15px]">
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
                  className="group cursor-pointer transition-all duration-300"
                >
                  <Link href={`/blog/${blog.slug}`} className="overflow-hidden">
                    <Image
                      Src={blog.image}
                      Alt={""}
                      ClassName="w-full transition-transform duration-300 group-hover:scale-110"
                      loadingType="lazy"
                    />
                  </Link>

                  <div className="space-y-[10px] pt-[15px]">
                    <h5 className="font-semibold">{blog.title}</h5>

                    <div className="font-normal flex items-center gap-1">
                      <CiCalendar size={18} />{" "}
                      <span>
                        {new Date(blog.createdAt).toLocaleString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                    </div>

                    <div
                      className="text-[0.9rem] line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                    />
                  </div>
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
