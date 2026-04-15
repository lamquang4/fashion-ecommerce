"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { FaRegEyeSlash } from "react-icons/fa";
import Pagination from "../ui/Pagination";
import Image from "../ui/Image";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import useGetCategories from "@/hooks/useGetCategories";
import Loading from "../ui/Loading";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteCategory from "@/hooks/useDeleteCategory";
import useVisibleCategory from "@/hooks/useVisibleCategory";
import InputSearch from "../ui/InputSearch";
import toast from "react-hot-toast";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
function CategoryList() {
  const {
    categories,
    totalPages,
    totalItems,
    currentPage,
    limit,
    mutate,
    isLoading,
  } = useGetCategories();
  const { deleteCategory, isLoading: isLoadingDeleteCategory } =
    useDeleteCategory();
  const { visibleCategory, isLoading: isLoadingVisibleCategory } =
    useVisibleCategory();

  const array = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Hiện",
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
      await deleteCategory(id);
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
      await visibleCategory(id, status);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };
  return (
    <>
      <ListHeader
        title="Danh mục"
        totalItems={totalItems}
        addLink="/add-category"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]   ">Tên danh mục</th>

              <th className="p-[1rem]  ">Giới tính</th>

              <th className="p-[1rem]  ">Số lượng sản phẩm</th>
              <th className="p-[1rem]  ">Ngày thêm</th>
              <th className="p-[1rem]  ">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>
              <th className="p-[1rem]  ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem]">
                    <div className="flex gap-[10px] items-center">
                      <div className="cursor-pointer">
                        <Image
                          src={category.image}
                          alt={category.image}
                          className={"w-[75px] cursor-pointer"}
                          loading="lazy"
                        />
                      </div>

                      <p className="text-[0.9rem] font-semibold">
                        {category.namecategory}
                      </p>
                    </div>
                  </td>
                  <td className="p-[1rem]  ">
                    {category.gender === 1
                      ? "Nam"
                      : category.gender === 0
                        ? "Nữ"
                        : ""}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex flex-col gap-[10px]">
                      <p>Tất cả: {category.totalProduct}</p>
                      <p>Đang hoạt động: {category.totalProductActive}</p>
                    </div>
                  </td>
                  <td className="p-[1rem]  ">
                    {new Date(category.createdAt as string).toLocaleDateString(
                      "vi-VN",
                    )}
                  </td>
                  <td className="p-[1rem]  ">
                    {category.status === 1 ? "Hiện" : "Ẩn"}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <button
                        disabled={isLoadingVisibleCategory}
                        onClick={() =>
                          handleVisible(
                            category._id || "",
                            category.status === 1 ? 0 : 1,
                          )
                        }
                      >
                        {category.status === 1 ? (
                          <FaRegEyeSlash size={22} className="text-[#74767d]" />
                        ) : (
                          <MdOutlineRemoveRedEye
                            size={22}
                            className="text-[#74767d]"
                          />
                        )}
                      </button>

                      <Link href={`/edit-category/${category._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button
                        disabled={isLoadingDeleteCategory}
                        onClick={() => handleDelete(category._id || "")}
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

export default CategoryList;
