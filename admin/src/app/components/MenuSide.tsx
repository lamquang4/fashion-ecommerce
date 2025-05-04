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
import { FaRegCircleUser } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import { RiCoupon2Line } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { PiHouseLineBold } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineContentPasteSearch } from "react-icons/md";
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
          menuOpen ? "xl:translate-x-[-100%] xl:p-0 xl:w-0" : "xl:translate-x-0"
        } custom-scroll fixed border top-0 h-full w-[300px] px-4 pb-5 bg-white transition-all duration-300 ease-in-out z-[25] xl:sticky xl:translate-x-0 overflow-y-auto border-b border-gray-200`}
      >
        <div className="mb-[20px] flex justify-center sticky top-0 bg-white px-4 py-4.5">
          <Image
            Src={"assets/other/logo.png"}
            Alt=""
            ClassName="w-[80px]"
            loadingType="eager"
          />
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
                    ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  openMenus["2a"] ||
                  pathname === "/product" ||
                  pathname === "/add-product"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <PiTShirtBold size={20} /> Sản phẩm
                </p>
                <button>
                  {openMenus[`2a`] ||
                  pathname === "/product" ||
                  pathname === "/add-product" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`2a`] ||
                  pathname === "/product" ||
                  pathname === "/add-product"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/product"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/product"} className="text-[0.9rem] font-medium">
                    Danh sách sản phẩm
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-product"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  openMenus["3a"] ||
                  pathname === "/category" ||
                  pathname === "/add-category"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <TbCategoryPlus size={20} /> Danh mục
                </p>
                <button>
                  {openMenus[`3a`] ||
                  pathname === "/category" ||
                  pathname === "/add-category" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`3a`] ||
                  pathname === "/category" ||
                  pathname === "/add-category"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/category"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-category"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  openMenus["4a"] || pathname === "/inventory"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <LuWarehouse size={20} /> Hàng tồn kho
                </p>
                <button>
                  {openMenus[`4a`] || pathname === "/inventory" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`4a`] || pathname === "/inventory"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/inventory"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  openMenus["12a"] || pathname === "/order"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <RiShoppingBag4Line size={20} /> Đơn hàng
                </p>
                <button>
                  {openMenus[`12a`] || pathname === "/order" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`12a`] || pathname === "/order"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/order"
                      ? " text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/order"} className="text-[0.9rem] font-medium">
                    Danh sách đơn hàng
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
                  openMenus["5a"] ||
                  pathname === "/admin" ||
                  pathname === "/add-admin"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <FaRegAddressCard size={20} /> Quản trị viên
                </p>
                <button>
                  {openMenus[`5a`] ||
                  pathname === "/admin" ||
                  pathname === "/add-admin" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`5a`] ||
                  pathname === "/admin" ||
                  pathname === "/add-admin"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/admin"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/admin"} className="text-[0.9rem] font-medium">
                    Danh sách quản trị viên
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-admin"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  openMenus["6a"] ||
                  pathname === "/customer" ||
                  pathname === "/add-customer"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <FaRegCircleUser size={20} /> Khách hàng
                </p>
                <button>
                  {openMenus[`6a`] ||
                  pathname === "/customer" ||
                  pathname === "/add-customer" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`6a`] ||
                  pathname === "/customer" ||
                  pathname === "/add-customer"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/customer"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-customer"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
          </div>

          <div>
            <p className="mb-[10px] text-[0.8rem] leading-[20px] text-gray-500 uppercase">
              Khác
            </p>

            <li>
              <div
                onClick={() => toggleOpen(`10a`)}
                className={`${
                  openMenus["10a"] ||
                  pathname === "/coupon" ||
                  pathname === "/add-coupon"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <RiCoupon2Line size={20} /> Phiếu giảm giá
                </p>
                <button>
                  {openMenus[`10a`] ||
                  pathname === "/coupon" ||
                  pathname === "/add-coupon" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`10a`] ||
                  pathname === "/coupon" ||
                  pathname === "/add-coupon"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/coupon"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/coupon"} className="text-[0.9rem] font-medium">
                    Danh sách phiếu giảm giá
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-coupon"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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
                  openMenus["14a"] ||
                  pathname === "/color" ||
                  pathname === "/add-color"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <IoColorPaletteOutline size={20} /> Màu
                </p>
                <button>
                  {openMenus[`14a`] ||
                  pathname === "/color" ||
                  pathname === "/add-color" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`14a`] ||
                  pathname === "/color" ||
                  pathname === "/add-color"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/color"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/color"} className="text-[0.9rem] font-medium">
                    Danh sách màu
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-color"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
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

          <div>
            <p className="mb-[10px] text-[0.8rem] leading-[20px] text-gray-500 uppercase">
              Nội dung
            </p>

            <li>
              <div
                onClick={() => toggleOpen(`20a`)}
                className={`${
                  openMenus["20a"] ||
                  pathname === "/mainbanner" ||
                  pathname === "/add-mainbanner"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <PiHouseLineBold size={20} /> Banner chính
                </p>
                <button>
                  {openMenus[`20a`] ||
                  pathname === "/mainbanner" ||
                  pathname === "/add-mainbanner" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`20a`] ||
                  pathname === "/mainbanner" ||
                  pathname === "/add-mainbanner"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/mainbanner"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/mainbanner"}
                    className="text-[0.9rem] font-medium"
                  >
                    Danh sách banner chính
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-mainbanner"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-mainbanner"}
                    className="text-[0.9rem] font-medium"
                  >
                    Thêm banner chính
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                href={"/promotebanner"}
                className={`${
                  pathname === "/promotebanner"
                    ? "text-[#0AB39C] bg-[#daf4f0]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <MdOutlineContentPasteSearch size={20} /> Banner khuyễn mãi
                </p>
              </Link>
            </li>

            <li>
              <Link
                href={"/collection"}
                className={`${
                  pathname === "/collection"
                    ? "text-[#0AB39C] bg-[#daf4f0]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <MdOutlineContentPasteSearch size={20} /> Bộ sưu tập
                </p>
              </Link>
            </li>

            <li>
              <div
                onClick={() => toggleOpen(`16a`)}
                className={`${
                  openMenus["16a"] ||
                  pathname === "/blog" ||
                  pathname === "/add-blog"
                    ? "text-[#0AB39C]"
                    : "hover:bg-gray-200"
                } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
              >
                <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                  <IoNewspaperOutline size={20} /> Tin tức
                </p>
                <button>
                  {openMenus[`16a`] ||
                  pathname === "/blog" ||
                  pathname === "/add-blog" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowUp size={18} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                  openMenus[`16a`] ||
                  pathname === "/blog" ||
                  pathname === "/add-blog"
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/blog"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link href={"/blog"} className="text-[0.9rem] font-medium">
                    Danh sách tin tức
                  </Link>
                </li>

                <li
                  className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                    pathname === "/add-blog"
                      ? "text-[#0AB39C] bg-[#daf4f0]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href={"/add-blog"}
                    className="text-[0.9rem] font-medium"
                  >
                    Thêm tin tức
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
