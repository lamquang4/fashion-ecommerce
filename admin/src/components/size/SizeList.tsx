"use client";
import Link from "next/link";
import Pagination from "../ui/Pagination";
import { LiaEdit } from "react-icons/lia";
import { VscTrash } from "react-icons/vsc";
import useGetSizes from "@/hooks/useGetSizes";
import Loading from "../ui/Loading";
import Image from "../ui/Image";
import useDeleteSize from "@/hooks/useDeleteSize";
import InputSearch from "../ui/InputSearch";
import toast from "react-hot-toast";
import ListHeader from "../ui/list/ListHeader";
function SizeList() {
  const {
    sizes,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetSizes();
  const { deleteSize, isLoading: isLoadingDeleteSize } = useDeleteSize();

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteSize(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };

  console.log(sizes);

  return (
    <>
      <ListHeader
        title="Kích thước"
        totalItems={totalItems}
        addLink="/add-size"
      />

      <div className="bg-white w-full overflow-auto">
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Kích thước</th>
              <th className="p-[1rem]  ">Vòng ngực</th>
              <th className="p-[1rem]  ">Vòng eo</th>
              <th className="p-[1rem]  ">Vòng mông</th>
              <th className="p-[1rem]  ">Chiều cao</th>
              <th className="p-[1rem]  ">Cân nặng </th>
              <th className="p-[1rem]  ">Ngày tạo</th>
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
            ) : sizes.length > 0 ? (
              sizes.map((size) => (
                <tr key={size._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem] text-[0.9rem] font-semibold">
                    {size.namesize}
                  </td>

                  <td className="p-[1rem] text-[0.9rem]">
                    {size.chest[0]} - {size.chest[1]}
                  </td>

                  <td className="p-[1rem] text-[0.9rem]">
                    {size.waist[0]} - {size.waist[1]}
                  </td>

                  <td className="p-[1rem] text-[0.9rem]">
                    {size.hip[0]} - {size.hip[1]}
                  </td>

                  <td className="p-[1rem] text-[0.9rem]">
                    {size.height[0]} - {size.height[1]}
                  </td>

                  <td className="p-[1rem] text-[0.9rem]">
                    {size.weight[0]} - {size.weight[1]}
                  </td>

                  <td className="p-[1rem]  ">
                    {new Date(size.createdAt as string).toLocaleDateString(
                      "vi-VN",
                    )}
                  </td>

                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/edit-size/${size._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button
                        disabled={isLoadingDeleteSize}
                        onClick={() => handleDelete(size._id || "")}
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

export default SizeList;
