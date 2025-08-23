"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import Pagination from "./Pagination";
import Image from "./Image";
import FilterDropDownMenu from "./FilterDropDownMenu";
import useGetCategories from "@/hooks/useGetCategories";
import Loading from "./Loading";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteCategory from "@/hooks/useDeleteCategory";
import useVisibleCategory from "@/hooks/useVisibleCategory";
import InputSearch from "./InputSearch";
import toast from "react-hot-toast";
function Category() {
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
      <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h2 className="mb-[20px] text-[#74767d] capitalize">
          Danh mục ({totalItems})
        </h2>

        <Link
          href={"/add-category"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className=" bg-white w-full overflow-auto">
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  text-[#444] text-[0.9rem]">
                Tên danh mục
              </th>

              <th className="p-[1rem] text-[#444] text-[0.9rem]">Giới tính</th>

              <th className="p-[1rem] text-[#444] text-[0.9rem]">
                Số lượng sản phẩm
              </th>
              <th className="p-[1rem] text-[#444] text-[0.9rem]">Ngày thêm</th>
              <th className="p-[1rem] text-[#444] text-[0.9rem]">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>
              <th className="p-[1rem] text-[#444] text-[0.9rem]">Hành động</th>
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
                          Src={category.image}
                          Alt={category.image}
                          ClassName={"w-[75px] cursor-pointer"}
                          loadingType="lazy"
                        />
                      </div>

                      <p className="text-[0.9rem] font-semibold">
                        {category.namecategory}
                      </p>
                    </div>
                  </td>
                  <td className="p-[1rem] text-[0.9rem] text-[#444]">
                    {category.gender === 1
                      ? "Nam"
                      : category.gender === 0
                      ? "Nữ"
                      : ""}
                  </td>
                  <td className="p-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex flex-col gap-[10px]">
                      <p>Tất cả: {category.totalProduct}</p>
                      <p>Đang hoạt động: {category.totalProductActive}</p>
                    </div>
                  </td>
                  <td className="p-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(category.createdAt as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="p-[1rem] text-[0.9rem] text-[#444]">
                    {category.status === 1 ? "Hiện" : "Ẩn"}
                  </td>
                  <td className="p-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        disabled={isLoadingVisibleCategory}
                        onClick={() =>
                          handleVisible(
                            category._id || "",
                            category.status === 1 ? 0 : 1
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
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[135px]"}
                      loadingType="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default Category;
