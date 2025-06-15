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
import { RxSize } from "react-icons/rx";
type MenuSideProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};

function MenuSide({ menuOpen, toggleMenu }: MenuSideProps) {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const menuData = [
    {
      title: "Hàng hóa",
      items: [
        {
          icon: <MdOutlineDashboard size={20} />,
          label: "Bảng điều khiển",
          path: "/dashboard",
        },
        {
          icon: <PiTShirtBold size={20} />,
          label: "Sản phẩm",
          key: "2a",
          children: [
            { label: "Danh sách sản phẩm", path: "/product" },
            { label: "Thêm sản phẩm", path: "/add-product" },
          ],
        },
        {
          icon: <TbCategoryPlus size={20} />,
          label: "Danh mục",
          key: "3a",
          children: [
            { label: "Danh sách danh mục", path: "/category" },
            { label: "Thêm danh mục", path: "/add-category" },
          ],
        },
        {
          icon: <LuWarehouse size={20} />,
          label: "Hàng tồn kho",
          key: "4a",
          children: [{ label: "Hàng trong kho", path: "/inventory" }],
        },
        {
          icon: <RiShoppingBag4Line size={20} />,
          label: "Đơn hàng",
          key: "12a",
          children: [{ label: "Danh sách đơn hàng", path: "/order" }],
        },
      ],
    },
    {
      title: "Người dùng",
      items: [
        {
          icon: <FaRegAddressCard size={20} />,
          label: "Quản trị viên",
          key: "5a",
          children: [
            { label: "Danh sách quản trị viên", path: "/admin" },
            { label: "Thêm quản trị viên", path: "/add-admin" },
          ],
        },
        {
          icon: <FaRegCircleUser size={20} />,
          label: "Khách hàng",
          key: "6a",
          children: [
            { label: "Danh sách khách hàng", path: "/customer" },
            { label: "Thêm khách hàng", path: "/add-customer" },
          ],
        },
      ],
    },
    {
      title: "Khác",
      items: [
        {
          icon: <RiCoupon2Line size={20} />,
          label: "Phiếu giảm giá",
          key: "10a",
          children: [
            { label: "Danh sách phiếu giảm giá", path: "/coupon" },
            { label: "Thêm sản phiếu giảm giá", path: "/add-coupon" },
          ],
        },
        {
          icon: <IoColorPaletteOutline size={20} />,
          label: "Màu",
          key: "14a",
          children: [
            { label: "Danh sách màu", path: "/color" },
            { label: "Thêm màu", path: "/add-color" },
          ],
        },
        {
          icon: <RxSize size={20} />,
          label: "Kích thước",
          key: "28a",
          children: [
            { label: "Danh sách kích thước", path: "/size" },
            { label: "Thêm kích thước", path: "/add-size" },
          ],
        },
      ],
    },
    {
      title: "Nội dung",
      items: [
        {
          icon: <PiHouseLineBold size={20} />,
          label: "Banner chính",
          key: "20a",
          children: [
            { label: "Danh sách banner chính", path: "/mainbanner" },
            { label: "Thêm banner chính", path: "/add-mainbanner" },
          ],
        },
        {
          icon: <MdOutlineContentPasteSearch size={20} />,
          label: "Banner khuyến mãi",
          path: "/promotebanner",
        },
        {
          icon: <MdOutlineContentPasteSearch size={20} />,
          label: "Bộ sưu tập",
          path: "/collection",
        },
        {
          icon: <IoNewspaperOutline size={20} />,
          label: "Tin tức",
          key: "16a",
          children: [
            { label: "Danh sách tin tức", path: "/blog" },
            { label: "Thêm tin tức", path: "/add-blog" },
          ],
        },
      ],
    },
  ];

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
        } custom-scroll fixed border top-0 h-full w-[320px] px-3.5 pb-5 bg-white transition-all duration-350 ease-in-out z-[25] xl:sticky xl:translate-x-0 overflow-y-auto border-b border-gray-200`}
      >
        <div className="mb-[20px] flex justify-center sticky top-0 bg-white px-3.5 py-4.5">
          <Image
            Src={"/assets/other/logo.png"}
            Alt=""
            ClassName="w-[80px]"
            loadingType="eager"
          />
        </div>
        <ul className="flex flex-col gap-[10px]">
          <ul className="flex flex-col gap-[10px]">
            {menuData.map((group, groupIndex) => (
              <div key={groupIndex}>
                <p className="mb-[10px] text-[0.8rem] leading-[20px] text-gray-500 uppercase">
                  {group.title}
                </p>
                {group.items.map((item, index) => (
                  <li key={index}>
                    {item.children ? (
                      <>
                        <div
                          onClick={() => toggleOpen(item.key)}
                          className={`${
                            openMenus[item.key] ||
                            item.children.some(
                              (child) => pathname === child.path
                            )
                              ? "text-[#0AB39C]"
                              : "hover:bg-gray-200"
                          } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
                        >
                          <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                            {item.icon} {item.label}
                          </p>
                          <button>
                            {openMenus[item.key] ||
                            item.children.some(
                              (child) => pathname === child.path
                            ) ? (
                              <IoIosArrowDown size={18} />
                            ) : (
                              <IoIosArrowUp size={18} />
                            )}
                          </button>
                        </div>
                        <ul
                          className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                            openMenus[item.key] ||
                            item.children.some(
                              (child) => pathname === child.path
                            )
                              ? "max-h-fit visible"
                              : ""
                          }`}
                        >
                          {item.children.map((child, childIndex) => (
                            <li
                              key={childIndex}
                              className={`rounded-lg p-3 w-full cursor-pointer my-[5px] ${
                                pathname === child.path
                                  ? "text-[#0AB39C] bg-[#daf4f0]"
                                  : "hover:bg-gray-200"
                              }`}
                            >
                              <Link
                                href={child.path}
                                className="text-[0.9rem] font-medium"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className={`${
                          pathname === item.path
                            ? "text-[#0AB39C] bg-[#daf4f0]"
                            : "hover:bg-gray-200"
                        } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
                      >
                        <p className="text-[0.9rem] font-medium flex items-center gap-[10px]">
                          {item.icon} {item.label}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </ul>
      </nav>

      {menuOpen && <Overplay closeMenu={toggleMenu} />}
    </>
  );
}

export default MenuSide;
