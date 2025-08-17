"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import Pagination from "./Pagination";
import Image from "./Image";
import FilterDropDownMenu from "./FilterDropDownMenu";
import useGetMainBanners from "@/hooks/useGetMainBanners";
import Loading from "./Loading";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteBanner from "@/hooks/useDeleteBanner";
import useVisibleBanner from "@/hooks/useVisibleBanner";
import toast from "react-hot-toast";
function MainBanner() {
  const {
    mainbanners,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetMainBanners();
  const { deleteBanner, isLoading: isLoadingDeleteBanner } = useDeleteBanner();
  const { visibleBanner, isLoading: isLoadingVisibleBanner } =
    useVisibleBanner();
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

  const array1 = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Banner chính desktop",
      value: 0,
    },
    {
      name: "Banner chính mobile",
      value: 1,
    },
  ];

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteBanner(id);
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
      await visibleBanner(id, status);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };
  return (
    <>
      <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Banner chính ({totalItems})
        </h1>

        <Link
          href={"/add-mainbanner"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className=" bg-white w-full overflow-auto">
        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] py-[1rem] text-left text-[#444] text-[0.9rem]">
                Hình
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Ngày thêm
              </th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu
                  title="Loại"
                  array={array1}
                  paramName="type"
                />
              </th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : mainbanners.length > 0 ? (
              mainbanners.map((mainbanner) => (
                <tr key={mainbanner._id}>
                  <td className="p-[1rem]">
                    <div className="flex gap-[10px] items-center">
                      <div className="cursor-pointer">
                        <Image
                          Src={mainbanner.image}
                          Alt={""}
                          ClassName={"w-[120px] cursor-pointer"}
                          loadingType="lazy"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(
                      mainbanner.createdAt as string
                    ).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {mainbanner.type === 0
                      ? "Banner chính desktop"
                      : "Banner chính mobile"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {mainbanner.status === 0 ? "Ẩn" : "Hiện"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        disabled={isLoadingVisibleBanner}
                        onClick={() =>
                          handleVisible(
                            mainbanner._id,
                            mainbanner.status === 1 ? 0 : 1
                          )
                        }
                      >
                        {mainbanner.status === 1 ? (
                          <FaRegEyeSlash size={22} className="text-[#74767d]" />
                        ) : (
                          <MdOutlineRemoveRedEye
                            size={22}
                            className="text-[#74767d]"
                          />
                        )}
                      </button>

                      <button
                        disabled={isLoadingDeleteBanner}
                        onClick={() => handleDelete(mainbanner._id)}
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
                  <div className="flex flex-col justify-center items-center">
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

export default MainBanner;
