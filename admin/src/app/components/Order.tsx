"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { FaSortDown } from "react-icons/fa";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { RiShoppingBag4Line } from "react-icons/ri";
import { RiTruckLine } from "react-icons/ri";
import { LuClock } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import Pagination from "./Pagination";
function Order() {
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const toggleDropdownMenu = () => {
    setOpenDropdownMenu((prev) => !prev);
  };
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Đơn hàng (20)
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6 mb-[25px]">
          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Tổng đơn</p>
              <p className="mt-0.5 text-xl font-medium">1500</p>
              <p className=" mt-3 flex items-center text-red-500">
                <IoIosArrowRoundDown size={25} />
                <span>1.3%</span>
              </p>
            </div>

            <div className="relative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase  rounded-none">
                <RiShoppingBag4Line size={25} />
              </div>
            </div>
          </div>

          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Đơn giao thành công</p>
              <p className="mt-0.5 text-xl font-medium">500</p>
              <p className="mt-3 flex items-center text-[#029A67]">
                <IoIosArrowRoundUp size={25} />
                <span>4.3%</span>
              </p>
            </div>

            <div className="elative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase rounded-none">
                <RiTruckLine size={25} />
              </div>
            </div>
          </div>

          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Đơn đã hủy</p>
              <p className="mt-0.5 text-xl font-medium">210</p>
              <p className="mt-3 flex items-center text-[#029A67]">
                <IoIosArrowRoundUp size={25} />
                <span>1%</span>
              </p>
            </div>

            <div className="elative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase rounded-none">
                <TbCancel size={25} />
              </div>
            </div>
          </div>

          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Đơn chờ xác nhận</p>
              <p className="mt-0.5 text-xl font-medium">100</p>
            </div>

            <div className="elative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase  rounded-none">
                <LuClock size={25} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[15px] mb-[25px] flex-wrap">
          <div className="relative flex gap-1.5 items-center">
            <label htmlFor="" className="text-[0.9rem] text-black">
              Từ:
            </label>
            <input
              name="startDate"
              type="date"
              className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400 text-gray-900"
            />
          </div>

          <div className="relative flex gap-1.5 items-center">
            <label htmlFor="" className="text-[0.9rem] text-black">
              Đến:
            </label>
            <input
              name="endDate"
              type="date"
              className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400 text-gray-900"
            />
          </div>
        </div>
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
                  <Link href={"/order-detail"}>
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

export default Order;
