"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import Pagination from "../ui/Pagination";
import Image from "../ui/Image";
import Loading from "../ui/Loading";
import useGetColors from "@/hooks/useGetColors";
import useDeleteColor from "@/hooks/useDeleteColor";
import InputSearch from "../ui/InputSearch";
import toast from "react-hot-toast";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
function ColorList() {
  const {
    colors,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetColors();
  const { deleteColor, isLoading: isLoadingDeleteColor } = useDeleteColor();

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteColor(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };
  return (
    <>
      <ListHeader title="Màu" totalItems={totalItems} addLink="/add-color" />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Tên màu</th>

              <th className="p-[1rem]  ">Mã màu</th>
              <th className="p-[1rem]  ">Ngày thêm</th>

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
            ) : colors.length > 0 ? (
              colors.map((color) => (
                <tr key={color._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem] text-[0.9rem] font-semibold">
                    <div className="flex gap-[10px] items-center">
                      <div
                        className={`w-5 h-5 border-gray-500 border`}
                        style={{ backgroundColor: color.codecolor }}
                      ></div>
                      {color.namecolor}
                    </div>
                  </td>
                  <td className="p-[1rem]  ">{color.codecolor}</td>
                  <td className="p-[1rem]  ">
                    {new Date(color.createdAt as string).toLocaleDateString(
                      "vi-VN",
                    )}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/edit-color/${color._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button
                        disabled={isLoadingDeleteColor}
                        onClick={() => handleDelete(color._id || "")}
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

export default ColorList;
