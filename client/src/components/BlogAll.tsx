"use client";
import BlogList from "./BlogList";
import useGetBlogs from "@/hooks/useGetBlogs";
import Pagination from "./Pagination";

function BlogAll() {
  const { blogs, totalItems, totalPages, currentPage, isLoading } =
    useGetBlogs();
  return (
    <>
      <section className="my-[40px]">
        <div className="mx-auto max-w-[1230px] w-full px-[10px] sm:px-[15px]">
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
