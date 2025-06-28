"use client";
import Link from "next/link";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Image from "./Image";
import Pagination from "./Pagination";
import useGetInventories from "@/hooks/useGetInventories";
import Loading from "./Loading";
import { useAppSelector } from "@/redux/hook";
import InputSearch from "./InputSearch";
function Inventory() {
  const loading = useAppSelector((state) => state.loadingSlice);
  const {
    inventories,
    totalPages,
    totalItems,
    currentPage,
    limit,
    setKeyword,
    totalQuantity,
  } = useGetInventories();

  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Hàng trong kho ({totalQuantity})
        </h1>
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
                Sản phẩm
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Màu
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Kích thước
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Số lượng
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Ngày tạo
              </th>

              <th className="py-[1rem] text-left text-[#444] text-[0.9rem] relative">
                Tình trạng
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
            ) : inventories.length > 0 ? (
              inventories.map((inventory, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem] w-[300px]">
                    <div className="flex gap-[10px] items-center">
                      <div className="cursor-pointer">
                        <Image
                          Src={inventory.product.image[0]}
                          Alt={""}
                          ClassName={"w-[75px] cursor-pointer"}
                          loadingType="lazy"
                        />
                      </div>

                      <div className="flex flex-col gap-[5px]">
                        <p className="text-[0.9rem] font-medium  text-[#444]">
                          {inventory.product.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-[1rem] text-[0.9rem]  text-[#444]">
                    <div className="flex gap-[10px] items-center">
                      <div
                        className={`w-5 h-5 border-gray-500 border`}
                        style={{ backgroundColor: inventory.color.codecolor }}
                      ></div>
                      {inventory.color.namecolor}
                    </div>
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {inventory.size.namesize}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {inventory.quantity}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(inventory.createdAt as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {inventory.quantity === 0 ? "Hết hàng" : "Còn hàng"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/edit-product/${inventory.product._id}`}>
                        <LiaExternalLinkAltSolid
                          size={23}
                          className="text-[#076ffe]"
                        />
                      </Link>
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

export default Inventory;
