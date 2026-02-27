"use client";
import Image from "../ui/Image";
import { Blog } from "@/types/type";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "../skeleton/BlogListSkeleton";

type Props = {
  blogs: Blog[];
  isLoading: boolean;
};

function BlogList({ blogs, isLoading }: Props) {
  return (
    <>
      <h2 className="mb-[20px]">Tất cả tin tức</h2>

      {isLoading ? (
        <BlogCardSkeleton count={12} />
      ) : blogs.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 ${
            blogs.length <= 0 ? "h-[50vh]" : ""
          }`}
        >
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="flex flex-col justify-center items-center gap-[15px]">
            <Image
              src={"/assets/other/notfound1.png"}
              alt={""}
              className={"w-[150px]"}
              loading="eager"
            />

            <h4 className="text-gray-600">Không có bài viết nào</h4>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogList;
