"use client";
import React, { useState } from "react";
import Link from "next/link";
import Overplay from "./Overplay";
import Image from "./Image";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { PiTShirtBold } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa";
import { LuWarehouse } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { PiHouseLineBold } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
interface MenuMobileProp {}
const MenuSide: React.FC<MenuMobileProp> = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleOpen = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav
        className={`fixed border top-0 left-[-100%] w-[290px] h-screen px-5 py-5 bg-white transition-all duration-500 ease-in-out z-[22] lg:static lg:translate-x-0 overflow-y-auto border-b border-gray-200`}
      >
        <div className="mb-[25px] flex justify-center">
          <Image Src={"assets/other/logo.png"} Alt="" ClassName="w-[85px]" />
        </div>
        <ul className="flex flex-col gap-[10px]">
          <div>
            <p className="mb-[10px] text-[0.8rem] leading-[20px] text-gray-500 uppercase">
              Hàng hóa
            </p>
            <li>
              <div
                onClick={() => toggleOpen(`1a`)}
                className={`${
                  openMenus["1a"]
                    ? "text-[#465fff] bg-[#ECF3FF]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <MdOutlineDashboard size={20} /> Bảng điều khiển
                </p>
              </div>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`2a`)}
                className={`${
                  openMenus["2a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <PiTShirtBold size={20} /> Sản phẩm
                </p>
                <button>
                  {openMenus[`2a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`2a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách sản phẩm
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Thêm sản phẩm
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`3a`)}
                className={`${
                  openMenus["3a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <TbCategoryPlus size={20} /> Danh mục
                </p>
                <button>
                  {openMenus[`3a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`3a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách danh mục
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Thêm danh mục
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`4a`)}
                className={`${
                  openMenus["4a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <LuWarehouse size={20} /> Hàng tồn kho
                </p>
                <button>
                  {openMenus[`4a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`4a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Kho
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Đơn hàng đã nhập
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`12a`)}
                className={`${
                  openMenus["12a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <RiShoppingBag4Line size={20} /> Đơn hàng
                </p>
                <button>
                  {openMenus[`12a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`12a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách đơn hàng
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`8a`)}
                className={`${
                  openMenus["8a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <FaRegCreditCard size={20} /> Mua hàng
                </p>
                <button>
                  {openMenus[`8a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`8a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách mua hàng
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Đặt hàng
                  </Link>
                </li>
              </ul>
            </li>
          </div>

          <div>
            <p className="mb-[10px] text-[0.8rem] leading-[20px] text-gray-500 uppercase">
              Người dùng
            </p>

            <li>
              <div
                onClick={() => toggleOpen(`5a`)}
                className={`${
                  openMenus["5a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <FaRegAddressCard size={20} /> Quản trị viên
                </p>
                <button>
                  {openMenus[`5a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`5a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách quản trị viên
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Thêm sản quản trị viên
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`6a`)}
                className={`${
                  openMenus["6a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <FaRegUser size={20} /> Khách hàng
                </p>
                <button>
                  {openMenus[`6a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`6a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách khách hàng
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Thêm khách hàng
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`7a`)}
                className={`${
                  openMenus["7a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <PiHouseLineBold size={20} /> Nhà cung cấp
                </p>
                <button>
                  {openMenus[`7a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`7a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách nhà cung câp
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Thêm nhà cung câp
                  </Link>
                </li>
              </ul>
            </li>
          </div>

          <div>
            <p className="mb-[10px] text-[0.8rem] leading-[20px] text-gray-500 uppercase">
              Khác
            </p>

            <li>
              <div
                onClick={() => toggleOpen(`10a`)}
                className={`${
                  openMenus["10a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <RiCoupon2Line size={20} /> Phiếu giảm giá
                </p>
                <button>
                  {openMenus[`10a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`10a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Danh sách phiếu giảm giá
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Thêm sản phiếu giảm giá
                  </Link>
                </li>
              </ul>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default MenuSide;
