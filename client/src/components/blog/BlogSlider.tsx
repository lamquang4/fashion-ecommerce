"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Blog } from "@/types/type";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "../skeleton/BlogListSkeleton";
type Props = {
  title: string;
  blogs: Blog[];
  isLoading: boolean;
};
function BlogSlider({ title, blogs, isLoading }: Props) {
  return (
    <section className="mb-[40px] px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <h2 className="mb-[20px]">{title}</h2>

        {isLoading ? (
          <BlogCardSkeleton count={3} />
        ) : (
          <Swiper
            spaceBetween={16}
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default BlogSlider;
