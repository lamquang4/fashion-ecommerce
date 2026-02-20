"use client";
import { VscTrash } from "react-icons/vsc";
import { FaRegEyeSlash } from "react-icons/fa";
import Pagination from "../../ui/Pagination";
import Image from "../../ui/Image";
import FilterDropDownMenu from "../../ui/FilterDropDownMenu";
import useGetMainBanners from "@/hooks/useGetMainBanners";
import Loading from "../../ui/Loading";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteBanner from "@/hooks/useDeleteBanner";
import useVisibleBanner from "@/hooks/useVisibleBanner";
import toast from "react-hot-toast";
import ListHeader from "@/components/list/ListHeader";
import ListBody from "@/components/list/ListBody";
function MainBannerList() {
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
      <ListHeader
        title="Banner chính"
        totalItems={totalItems}
        addLink="/add-mainbanner"
      />

      <ListBody>
        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Hình</th>
              <th className="p-[1rem]  ">Ngày thêm</th>
              <th className="p-[1rem]   relative">
                <FilterDropDownMenu
                  title="Loại"
                  array={array1}
                  paramName="type"
                />
              </th>
              <th className="p-[1rem]   relative">
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
            ) : mainbanners.length > 0 ? (
              mainbanners.map((mainbanner) => (
                <tr key={mainbanner._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem]">
                    <div className="flex gap-[10px] items-center">
                      <div className="cursor-pointer">
                        <Image
                          src={mainbanner.image}
                          alt={""}
                          className={"w-[120px] cursor-pointer"}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-[1rem]  ">
                    {new Date(
                      mainbanner.createdAt as string,
                    ).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-[1rem]  ">
                    {mainbanner.type === 0
                      ? "Banner chính desktop"
                      : "Banner chính mobile"}
                  </td>
                  <td className="p-[1rem]  ">
                    {mainbanner.status === 0 ? "Ẩn" : "Hiện"}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <button
                        disabled={isLoadingVisibleBanner}
                        onClick={() =>
                          handleVisible(
                            mainbanner._id,
                            mainbanner.status === 1 ? 0 : 1,
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

export default MainBannerList;
