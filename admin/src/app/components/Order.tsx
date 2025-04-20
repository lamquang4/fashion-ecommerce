"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { FaSortDown } from "react-icons/fa";

function Order() {
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const toggleDropdownMenu = () => {
    setOpenDropdownMenu((prev) => !prev);
  };
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.8rem] text-[#74767d]">
          Đơn hàng (20)
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
                Mã đơn
              </th>

              <th className="text-left text-[#444] text-[0.9rem]">
                Khách hàng
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">
                Thanh toán
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Tổng cộng</th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày tạo</th>
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
                        Chờ xác nhận
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Xác nhận
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Đang giao
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Giao thành công
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Đã hủy
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
              <td className="pl-[1rem] py-[1rem] text-[#22BAA0] font-semibold">
                #OD45876
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">Quang Lam</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">COD</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">250,000₫</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20/4/2025</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">Hiện</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <div className="flex items-center gap-[15px]">
                  <Link href={"/"}>
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
    </>
  );
}

export default Order;
