"use client";
import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import Link from "next/link";
import Overplay from "./Overplay";
import useGetCategories from "@/hooks/useGetCategories";
type MenuMobileProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};
function Menumobile({ isOpen, toggleMenu }: MenuMobileProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { categoriesMale, categoriesFemale } = useGetCategories();
  const toggleOpen = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  return (
    <>
      <nav
        className={`fixed top-0 w-full max-w-[320px] h-screen p-5 bg-white shadow-md overflow-hidden overscroll-contain transition-all duration-500 ease-in-out z-[22] ${
          isOpen ? "right-0 visible" : "right-[-100%] invisible"
        }`}
      >
        <div className="mb-5 flex justify-end items-center">
          <button onClick={toggleMenu} className="flex">
            <HiMiniXMark size={30} color="black" />
          </button>
        </div>

        <ul className="mb-[30px]">
          <li className="border-b border-gray-300">
            <Link
              href={"/"}
              className="text-black text-[0.9rem] font-medium py-4 uppercase"
            >
              Trang chủ
            </Link>
          </li>

          <li className="border-b border-gray-300">
            <div
              onClick={() => toggleOpen(`abc`)}
              className="w-full cursor-pointer flex justify-between items-center"
            >
              <p className="text-black text-[0.9rem] font-medium py-4 uppercase">
                Nam
              </p>
              <button>
                {openMenus[`abc`] ? (
                  <FaMinus className="text-[#3b3a3a]" size={15} />
                ) : (
                  <FaPlus className="text-[#3b3a3a]" size={15} />
                )}
              </button>
            </div>

            {categoriesMale.length > 0 && (
              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out ${
                  openMenus[`abc`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="my-[10px]">
                  <Link
                    href={`/collection/nam`}
                    className="py-[8px] text-[0.938rem] text-[#777777] font-medium hover:text-black"
                  >
                    Đồ nam
                  </Link>
                </li>
                {categoriesMale.map((category, index) => (
                  <li className="my-[10px]" key={index}>
                    <Link
                      href={`/collection/${category.slug}`}
                      className="py-[8px] text-[0.938rem] text-[#777777] font-medium hover:text-black"
                    >
                      {category.namecategory}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="border-b border-gray-300">
            <div
              onClick={() => toggleOpen(`xyz`)}
              className="w-full cursor-pointer flex justify-between items-center"
            >
              <p className="text-black text-[0.9rem] font-medium py-4 uppercase">
                Nữ
              </p>
              <button>
                {openMenus[`xyz`] ? (
                  <FaMinus className="text-[#3b3a3a]" size={15} />
                ) : (
                  <FaPlus className="text-[#3b3a3a]" size={15} />
                )}
              </button>
            </div>

            {categoriesFemale.length > 0 && (
              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out ${
                  openMenus[`xyz`] ? "max-h-fit visible" : ""
                }`}
              >
                <li className="my-[10px]">
                  <Link
                    href={`/collection/nu`}
                    className="py-[8px] text-[0.938rem] text-[#777777] font-medium hover:text-black"
                  >
                    Đồ nữ
                  </Link>
                </li>
                {categoriesFemale.map((category, index) => (
                  <li className="my-[10px]" key={index}>
                    <Link
                      href={`/collection/${category.slug}`}
                      className="py-[8px] text-[0.938rem] text-[#777777] font-medium hover:text-black"
                    >
                      {category.namecategory}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="border-b border-gray-300">
            <div
              onClick={() => toggleOpen(`klo`)}
              className="w-full cursor-pointer flex justify-between items-center"
            >
              <p className="text-black text-[0.9rem] font-medium py-4 uppercase">
                Giảm giá
              </p>
              <button>
                {openMenus[`klo`] ? (
                  <FaMinus className="text-[#3b3a3a]" size={15} />
                ) : (
                  <FaPlus className="text-[#3b3a3a]" size={15} />
                )}
              </button>
            </div>

            <ul
              className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out ${
                openMenus[`klo`] ? "max-h-fit visible" : ""
              }`}
            >
              <li className="my-[10px]">
                <Link
                  href={"/"}
                  className="py-[8px] text-[0.938rem] text-[#777777] font-medium hover:text-black"
                >
                  Giảm giá đồ nam
                </Link>
              </li>

              <li className="my-[10px]">
                <Link
                  href={"/"}
                  className="py-[8px] text-[0.938rem] text-[#777777] font-medium hover:text-black"
                >
                  Giảm giá đồ nữ
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
    </>
  );
}

export default Menumobile;
