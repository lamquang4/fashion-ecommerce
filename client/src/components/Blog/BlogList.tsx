"use client";
import Link from "next/link";
import Image from "../Image";
import { CiCalendar } from "react-icons/ci";
import { Blog } from "@/types/type";
import Loading from "../Loading";

type Props = {
  blogs: Blog[];
  isLoading: boolean;
};

function BlogList({ blogs, isLoading }: Props) {
  return (
    <>
      <h2 className="mb-[20px]">Tất cả tin tức</h2>

      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : blogs.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 ${
            blogs.length <= 0 ? "h-[50vh]" : ""
          }`}
        >
          {blogs.map((blog) => (
            <div
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
    </>
  );
}

export default BlogList;
