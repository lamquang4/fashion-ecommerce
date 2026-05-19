"use client";
import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import useGetBlogs from "@/hooks/useGetBlogs";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import BlogTable from "./BlogTable";
function BlogList() {
  const {
    blogs,
    totalPages,
    totalItems,
    currentPage,
    limit,
    mutate,
    isLoading,
  } = useGetBlogs();

  return (
    <>
      <ListHeader
        title="Bài viết"
        totalItems={totalItems}
        addLink="/add-blog"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <BlogTable blogs={blogs} isLoading={isLoading} mutate={mutate} />
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default BlogList;
