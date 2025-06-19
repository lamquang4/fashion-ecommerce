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
import { useAppSelector } from "@/redux/hook";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteBanner from "@/hooks/useDeleteBanner";
import useVisibleBanner from "@/hooks/useVisibleBanner";
function MainBanner() {
  const loading = useAppSelector((state) => state.loadingSlice);
  const { mainBanners, fetchMainBanners } = useGetMainBanners();
  const { deleteBanner } = useDeleteBanner(fetchMainBanners);
  const { visibleBanner } = useVisibleBanner(fetchMainBanners);
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

  const array1 = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Banner chính desktop",
      status: 1,
    },
    {
      name: "Banner chính mobile",
      status: 0,
    },
  ];
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Banner chính ({mainBanners.length})
        </h1>

        <Link
          href={"/add-mainbanner"}
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
                Hình
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày thêm</th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu title="Loại" array={array1} />
              </th>
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
                  <Loading height={30} />
                </td>
              </tr>
            ) : mainBanners.length > 0 ? (
              mainBanners.map((mainBanner, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem]">
                    <div className="flex gap-[10px] items-center">
                      <div className="cursor-pointer">
                        <Image
                          Src={mainBanner.image}
                          Alt={""}
                          ClassName={"w-[120px] cursor-pointer"}
                          loadingType="lazy"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(
                      mainBanner.createdAt as string
                    ).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {mainBanner.type === 0
                      ? "Banner chính desktop"
                      : "Banner chính mobile"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {mainBanner.status === 0 ? "Ẩn" : "Hiện"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        onClick={() =>
                          visibleBanner({
                            _id: mainBanner._id,
                            status: mainBanner.status === 1 ? 0 : 1,
                          })
                        }
                      >
                        {mainBanner.status === 1 ? (
                          <FaRegEyeSlash size={22} className="text-[#74767d]" />
                        ) : (
                          <MdOutlineRemoveRedEye
                            size={22}
                            className="text-[#74767d]"
                          />
                        )}
                      </button>

                      <button onClick={() => deleteBanner(mainBanner._id)}>
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

export default MainBanner;
