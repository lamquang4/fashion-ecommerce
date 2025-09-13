"use client";
import Link from "next/link";
import Image from "./Image";
import { CiCalendar } from "react-icons/ci";
import { Blog } from "@/types/type";
import Loading from "./Loading";

type Props = {
  blogs: Blog[];
  isLoading: boolean;
};

function BlogList({ blogs, isLoading }: Props) {
  return (
    <>
      <div>
        <h2 className="mb-[20px]">Tất cả bài viết</h2>

        {isLoading ? (
          <Loading height={70} size={50} color="black" thickness={2} />
        ) : blogs.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${
              blogs.length <= 0 ? "h-[50vh]" : ""
            }`}
          >
            {blogs.map((blog) => (
              <div
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

                <div className="space-y-[8px] py-[12px]">
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

                  <h5 className="font-semibold">{blog.title}</h5>

                  <div
                    className="text-[0.9rem] line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: blog?.content || "",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <Image
                Src={"/assets/other/notfound1.png"}
                Alt={""}
                ClassName={"w-[150px]"}
                loadingType="eager"
              />

              <h4 className="text-gray-600">Không có bài viết nào</h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BlogList;
