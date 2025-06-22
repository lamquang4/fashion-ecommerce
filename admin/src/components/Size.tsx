"use client";
import Link from "next/link";
import Pagination from "./Pagination";
import { LiaEdit } from "react-icons/lia";
import { VscTrash } from "react-icons/vsc";
import { IoMdAddCircle } from "react-icons/io";
import { useAppSelector } from "@/redux/hook";
import useGetSizes from "@/hooks/useGetSizes";
import Loading from "./Loading";
import Image from "./Image";
import useDeleteSize from "@/hooks/useDeleteSize";
import InputSearch from "./InputSearch";
function Size() {
  const {
    sizes,
    fetchSizes,
    totalPages,
    totalItems,
    currentPage,
    limit,
    setKeyword,
  } = useGetSizes();
  const loading = useAppSelector((state) => state.loadingSlice);
  const { deleteSize } = useDeleteSize(fetchSizes);

  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Kích thước ({totalItems})
        </h1>

        <Link
          href={"/add-size"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            <InputSearch onSearchChange={(val) => setKeyword(val)} />
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] py-[1rem] text-left text-[#444] text-[0.9rem]">
                Kích thước
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Ngày tạo
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
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
            ) : sizes.length > 0 ? (
              sizes.map((size, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem] w-[300px]">
                    {size.namesize}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(size.createdAt as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/edit-size/${size._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button onClick={() => deleteSize(size._id)}>
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default Size;
