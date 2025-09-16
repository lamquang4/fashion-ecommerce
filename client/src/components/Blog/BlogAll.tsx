"use client";
import BlogList from "./BlogList";
import useGetBlogs from "@/hooks/useGetBlogs";
import Pagination from "../Pagination";
import BreadCrumb from "../BreadCrumb";

function BlogAll() {
  const { blogs, totalItems, totalPages, currentPage, isLoading } =
    useGetBlogs();

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: "Tất cả tin tức",
      href: `/blog`,
    },
  ];
  return (
    <>
      <BreadCrumb items={array} />

      <section className="mb-[40px] px-[10px] sm:px-[15px]">
        <div className="mx-auto max-w-[1230px] w-full">
          <BlogList blogs={blogs} isLoading={isLoading} />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            totalItems={totalItems}
          />
        </div>
      </section>
    </>
  );
}

export default BlogAll;
