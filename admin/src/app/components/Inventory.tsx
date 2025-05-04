"use client";
import Link from "next/link";
import React from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Image from "./Image";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";
function Inventory() {
  const array = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Còn hàng",
      status: 1,
    },
    {
      name: "Hết hàng",
      status: 0,
    },
  ];
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Hàng trong kho (20)
        </h1>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-[150px] h-[30px] border border-[#b0b0b0] inline-block px-[0.5rem] text-[#666] outline-none text-[0.8rem]"
            />
          </div>
          <div className="flex items-center">
            <span className="inline-block mr-[0.6rem] text-[0.9rem] text-[#666]">
              Số lượng
            </span>
            <select
              name=""
              className="w-[100px] h-[30px] border border-[#b0b0b0] inline-block px-[0.5rem] text-[#666] outline-none text-[0.9rem]"
            >
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] text-left text-[#444] text-[0.9rem]">
                Sản phẩm
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Màu</th>
              <th className="text-left text-[#444] text-[0.9rem]">
                Kích thước
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Số lượng</th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày tạo</th>

              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu title="Tình trạng" array={array} />
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pl-[1rem] py-[1rem] w-[300px]">
                <div className="flex gap-[10px] items-center">
                  <div className="cursor-pointer">
                    <Image
                      Src={"assets/products/IMGSP0841.png"}
                      Alt={""}
                      ClassName={"w-[75px] cursor-pointer"}
                      loadingType="lazy"
                    />
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[0.9rem] font-medium  text-[#444]">
                      Áo sơ mi
                    </p>
                  </div>
                </div>
              </td>

              <td className="py-[1rem] text-[0.9rem]  text-[#444]">
                <div className="flex gap-[10px] items-center text-[#FF0000]">
                  <div className="w-5 h-5 bg-[#FF0000]"></div>
                  Đỏ tươi
                </div>
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">XL</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20/4/2025</td>

              <td className="py-[1rem] text-[0.9rem] text-[#444]">Còn hàng</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <div className="flex items-center gap-[15px]">
                  <Link href={"/product"}>
                    <LiaExternalLinkAltSolid
                      size={23}
                      className="text-[#076ffe]"
                    />
                  </Link>
                </div>
              </td>
            </tr>

            {/*
           <tr>
                <td colSpan="8" className="w-full h-[70vh]">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[180px]"}
                    />
                  </div>
                </td>
              </tr>
    */}
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
}

export default Inventory;
