"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import Pagination from "./Pagination";
import useGetColors from "@/hooks/useGetColors";
import { useAppSelector } from "@/redux/hook";
import Image from "./Image";
import Loading from "./Loading";
import useDeleteColor from "@/hooks/useDeleteColor";
function Color() {
  const { colors, fetchColors } = useGetColors();
  const loading = useAppSelector((state) => state.loadingSlice);
  const { deleteColor } = useDeleteColor(fetchColors);
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Màu ({colors.length})
        </h1>

        <Link
          href={"/add-color"}
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
                Tên màu
              </th>

              <th className="text-left text-[#444] text-[0.9rem]">Mã màu</th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày thêm</th>
              <th className="text-left text-[#444] text-[0.9rem]">
                Số lượng đang dùng
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
                  <Loading height={50} />
                </td>
              </tr>
            ) : colors.length > 0 ? (
              colors.map((color, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem] text-[0.9rem] font-medium">
                    <div className="flex gap-[10px] items-center">
                      <div
                        className={`w-5 h-5 border-gray-500 border`}
                        style={{ backgroundColor: color.codecolor }}
                      ></div>
                      {color.namecolor}
                    </div>
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {color.codecolor}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(color.createdAt as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">5</td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/edit-color/${color._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button onClick={() => deleteColor(color._id)}>
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

export default Color;
