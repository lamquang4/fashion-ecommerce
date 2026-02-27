"use client";
import Link from "next/link";
import Image from "../ui/Image";
import { Blog } from "@/types/type";
import { CiCalendar } from "react-icons/ci";
import { memo } from "react";
type Props = {
  blog: Blog;
};

function BlogCard({ blog }: Props) {
  return (
    <div
      key={blog._id || blog.slug}
      className=" group cursor-pointer h-auto rounded-md shadow-md"
    >
      <Link href={`/blog/${blog.slug}`} className="h-full">
        <div className="w-full aspect-[16/9] overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col flex-grow space-y-3 py-6 px-[15px] leading-relaxed">
          <h5 className="font-semibold">{blog.title}</h5>

          <p className="text-gray-500 line-clamp-3">{blog.summary}</p>

          <div className="flex justify-between items-center pt-4 border-t border-gray-300">
            <div className="text-gray-500 flex items-center gap-1">
              <CiCalendar size={18} />
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
    </div>
  );
}

export default memo(BlogCard);
