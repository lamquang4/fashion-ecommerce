"use client";
import Link from "next/link";
import React, { useState } from "react";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import Image from "./Image";
import Pagination from "./Pagination";
function Product() {
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const toggleDropdownMenu = () => {
    setOpenDropdownMenu((prev) => !prev);
  };
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Sản phẩm (20)
        </h1>

        <Link
          href={"/add-product"}
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
                Sản phẩm
              </th>

              <th className="text-left text-[#444] text-[0.9rem]">Giá</th>
              <th className="text-left text-[#444] text-[0.9rem]">Số lượng</th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày thêm</th>
              <th className="text-left text-[#444] text-[0.9rem]">Danh mục</th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <span
                  onMouseOut={toggleDropdownMenu}
                  onMouseOver={toggleDropdownMenu}
                  className="py-[1rem] cursor-pointer flex items-center gap-[2px]"
                >
                  Tình trạng <FaSortDown size={14} />
                  {openDropdownMenu && (
                    <div className="absolute bg-[#f9f9f9] z-10 top-[90%] left-0 min-w-[160px] shadow-sm font-medium">
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Tất cả
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Bán ra
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Hết hàng
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Đang giảm giá
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Ẩn
                      </button>
                    </div>
                  )}
                </span>
              </th>
              <th className="p-[1rem_0] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pl-[1rem] py-[1rem] w-[300px]">
                <div className="flex gap-[10px] items-center">
                  <div>
                    <Image
                      Src={"assets/products/IMGSP0841.png"}
                      Alt={""}
                      ClassName={"w-[75px] cursor-pointer"}
                    />
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[0.9rem] font-medium  text-[#444]">
                      Áo sơ mi
                    </p>
                    <p className="text-[0.9rem]  text-[#444]">
                      Kích thước: XL, L, S
                    </p>
                  </div>
                </div>
              </td>

              <td className="py-[1rem] text-[0.9rem]  text-[#444]">50,000₫</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[0.9rem]">Còn lại: 480</p>
                  <p className="text-[0.9rem]">Đã bán: 220</p>
                </div>
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20/4/2025</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                Nam / Sơ mi
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">Bán ra</td>
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

export default Product;
