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
import { useAppSelector } from "@/redux/hook";
import Loading from "./Loading";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteCategory from "@/hooks/useDeleteCategory";
import useVisibleCategory from "@/hooks/useVisibleCategory";
function Category() {
  const { categories, fetchCategories } = useGetCategories();
  const loading = useAppSelector((state) => state.loadingSlice);
  const { deleteCategory } = useDeleteCategory(fetchCategories);
  const { visibleCategory } = useVisibleCategory(fetchCategories);

  const array = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Hiện",
      status: 1,
    },
    {
      name: "Ẩn",
      status: 0,
    },
  ];
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Danh mục ({categories.length})
        </h1>

        <Link
          href={"/add-category"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="p-[6px_10px] border border-[#b0b0b0] inline-block text-[#666] outline-none text-[0.9rem]"
            />
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] text-left text-[#444] text-[0.9rem]">
                Tên danh mục
              </th>

              <th className="text-left text-[#444] text-[0.9rem]">Giới tính</th>
              <th className="text-left text-[#444] text-[0.9rem]">Số lượng</th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày thêm</th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu title="Tình trạng" array={array} />
              </th>
              <th className="p-[1rem_0] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading />
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem]">
                    <div className="flex gap-[10px] items-center">
                      <div className="cursor-pointer">
                        <Image
                          Src={category.image}
                          Alt={category.image}
                          ClassName={"w-[75px] cursor-pointer"}
                          loadingType="lazy"
                        />
                      </div>

                      <div className="flex flex-col gap-[5px]">
                        <p className="text-[0.9rem] font-medium  text-[#444]">
                          {category.namecategory}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {category.gender === 1 ? "Nam" : "Nữ"}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">500</td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(category.createdAt as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {category.status === 1 ? "Hiện" : "Ẩn"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        onClick={() =>
                          visibleCategory({
                            _id: category._id,
                            status: category.status === 1 ? 0 : 1,
                          })
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

                      <button onClick={() => deleteCategory(category._id)}>
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[180px]"}
                      loadingType="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
}

export default Category;
