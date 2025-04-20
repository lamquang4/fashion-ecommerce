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
import { IoColorPaletteOutline } from "react-icons/io5";
import { RiCoupon2Line } from "react-icons/ri";
import { usePathname } from "next/navigation";

type MenuSideProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};

function MenuSide({ menuOpen, toggleMenu }: MenuSideProps) {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleOpen = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <>
      <nav
        className={` ${menuOpen ? "left-0" : "left-[-100%]"} 
        ${
          menuOpen
            ? "lg:translate-x-[-100%] lg:w-[0px] lg:p-0"
            : "lg:translate-x-0"
        } custom-scroll fixed border top-0 h-screen w-[300px] px-4 pb-5 bg-white transition-all duration-500 ease-in-out z-[25] lg:sticky lg:translate-x-0 overflow-y-auto border-b border-gray-200`}
      >
        <div className="mb-[20px] flex justify-center sticky top-0 bg-white px-4 py-5">
          <Image Src={"assets/other/logo.png"} Alt="" ClassName="w-[85px]" />
        </div>
        <ul className="flex flex-col gap-[10px]">
          <div>
            <p className="mb-[10px] text-[0.8rem] leading-[20px] text-gray-500 uppercase">
              Hàng hóa
            </p>
            <li>
              <Link
                href={"/dashboard"}
                className={`${
                  pathname === "/dashboard"
                    ? "text-[#465fff] bg-[#ECF3FF]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <MdOutlineDashboard size={20} /> Bảng điều khiển
                </p>
              </Link>
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
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/product"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/product"} className="text-[0.9rem] font-medium">
                    Danh sách sản phẩm
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/add-product"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-product"}
                    className="text-[0.9rem] font-medium"
                  >
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
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/category"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/category"}
                    className="text-[0.9rem] font-medium"
                  >
                    Danh sách danh mục
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/add-category"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-category"}
                    className="text-[0.9rem] font-medium"
                  >
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
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/inventory"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/inventory"}
                    className="text-[0.9rem] font-medium"
                  >
                    Hàng trong kho
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
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/order"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/order"} className="text-[0.9rem] font-medium">
                    Danh sách đơn hàng
                  </Link>
                </li>
              </ul>
            </li>

            {/*
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
        */}
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
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/admin"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/admin"} className="text-[0.9rem] font-medium">
                    Danh sách quản trị viên
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/add-admin"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-admin"}
                    className="text-[0.9rem] font-medium"
                  >
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
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/customer"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/customer"}
                    className="text-[0.9rem] font-medium"
                  >
                    Danh sách khách hàng
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/add-customer"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-customer"}
                    className="text-[0.9rem] font-medium"
                  >
                    Thêm khách hàng
                  </Link>
                </li>
              </ul>
            </li>

            {/*
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
                    Danh sách nhà cung cấp
                  </Link>
                </li>

                <li className="rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200">
                  <Link href={"/"} className="text-[0.9rem] font-medium">
                    Thêm nhà cung câp
                  </Link>
                </li>
              </ul>
            </li>
            */}
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
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/coupon"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/coupon"} className="text-[0.9rem] font-medium">
                    Danh sách phiếu giảm giá
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/add-coupon"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-coupon"}
                    className="text-[0.9rem] font-medium"
                  >
                    Thêm sản phiếu giảm giá
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`14a`)}
                className={`${
                  openMenus["14a"] ? "text-[#465fff]" : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <IoColorPaletteOutline size={20} /> Màu
                </p>
                <button>
                  {openMenus[`14a`] ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`14a`] ? "max-h-fit visible" : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/color"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/color"} className="text-[0.9rem] font-medium">
                    Danh sách màu
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] hover:bg-gray-200 ${
                    pathname === "/add-color"
                      ? "text-[#465fff] bg-[#ECF3FF]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-color"}
                    className="text-[0.9rem] font-medium"
                  >
                    Thêm màu
                  </Link>
                </li>
              </ul>
            </li>
          </div>
        </ul>
      </nav>

      {menuOpen && <Overplay closeMenu={toggleMenu} />}
    </>
  );
}

export default MenuSide;
