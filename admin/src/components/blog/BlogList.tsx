"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { FaRegEyeSlash } from "react-icons/fa";
import Pagination from "../ui/Pagination";
import Image from "../ui/Image";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import InputSearch from "../ui/InputSearch";
import useGetBlogs from "@/hooks/useGetBlogs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteBlog from "@/hooks/useDeleteBlog";
import toast from "react-hot-toast";
import useVisibleBlog from "@/hooks/useVisibleBlog";
import Loading from "../ui/Loading";
import ListHeader from "../list/ListHeader";
import ListBody from "../list/ListBody";
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
  const { deleteBlog, isLoading: isLoadingDeleteBlog } = useDeleteBlog();
  const { visibleBlog, isLoading: isLoadingVisibleBlog } = useVisibleBlog();

  const array = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Công bố",
      value: 1,
    },
    {
      name: "Ẩn",
      value: 0,
    },
  ];

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteBlog(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };

  const handleVisible = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }
    try {
      await visibleBlog(id, status);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };

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

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]">Hình nền</th>

              <th className="p-[1rem]">Tiêu đề</th>

              <th className="p-[1rem]">Ngày tạo</th>
              <th className="p-[1rem] relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>
              <th className="p-[1rem]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem]">
                    <div className="flex gap-[10px] items-center">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        className={"w-[120px] cursor-pointer"}
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className="p-[1rem]">{blog.title}</td>

                  <td className="p-[1rem]">
                    {new Date(blog.createdAt as string).toLocaleDateString(
                      "vi-VN",
                    )}
                  </td>
                  <td className="p-[1rem]">
                    {blog.status === 1 ? "Công bố" : "Ẩn"}
                  </td>
                  <td className="p-[1rem]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        disabled={isLoadingVisibleBlog}
                        onClick={() =>
                          handleVisible(
                            blog._id || "",
                            blog.status === 1 ? 0 : 1,
                          )
                        }
                      >
                        {blog.status === 1 ? (
                          <FaRegEyeSlash size={22} className="text-[#74767d]" />
                        ) : (
                          <MdOutlineRemoveRedEye
                            size={22}
                            className="text-[#74767d]"
                          />
                        )}
                      </button>
                      <Link href={`/edit-blog/${blog._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>
                      <button
                        disabled={isLoadingDeleteBlog}
                        onClick={() => handleDelete(blog._id || "")}
                      >
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/assets/other/notfound1.png"}
                      alt={""}
                      className={"w-[135px]"}
                      loading="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
