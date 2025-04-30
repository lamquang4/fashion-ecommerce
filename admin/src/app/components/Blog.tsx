"use client";
import Link from "next/link";
import React from "react";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import Pagination from "./Pagination";
import Image from "./Image";
import FilterDropDownMenu from "./FilterDropDownMenu";
function Blog() {
  const array = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Công bố",
      status: 1,
    },
    {
      name: "Ẩn",
      status: 0,
    },
  ];

  const array1 = [
    {
      name: "Mới nhất",
      status: null,
    },
    {
      name: "Lượt xem nhiều nhất",
      status: null,
    },
    {
      name: "Lượt xem ít nhất",
      status: null,
    },
  ];
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Tin tức (20)
        </h1>

        <Link
          href={"/add-blog"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
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
                Hình bìa
              </th>

              <th className="text-left text-[#444] text-[0.9rem]">Tiêu đề</th>
              <th className="text-left text-[#444] text-[0.9rem]">
                <FilterDropDownMenu title="Thông số" array={array1} />
              </th>
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
            <tr>
              <td className="pl-[1rem] py-[1rem]">
                <div className="flex gap-[10px] items-center">
                  <div className="cursor-pointer">
                    <Image
                      Src={"assets/banner/banner-new.png"}
                      Alt={""}
                      ClassName={"w-[120px] cursor-pointer"}
                    />
                  </div>
                </div>
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                DỌN KHO HÈ CŨ - ĐÓN HÀNG MỚI VỀ
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                23 lượt xem
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20/4/2025</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">Công bố</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <div className="flex items-center gap-[15px]">
                  <button>
                    <FaRegEyeSlash size={22} className="text-[#74767d]" />
                    {/*
   <MdOutlineRemoveRedEye
                            size={22}
                            className="text-[#74767d]"
                          />
                    */}
                  </button>
                  <Link href={"/"}>
                    <LiaEdit size={22} className="text-[#076ffe]" />
                  </Link>

                  <button>
                    <VscTrash size={22} className="text-[#d9534f]" />
                  </button>
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

export default Blog;
