"use client";
import React from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import Overplay from "./Overplay";
type AdvancedSearchProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};
function AdvancedSearch({ isOpen, toggleMenu }: AdvancedSearchProps) {
  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full max-w-[320px] h-full overflow-scroll bg-white z-[25] px-[12px] pl-[20px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-[0px]" : "translate-x-[320px]"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="sticky top-0 overflow-hidden bg-white z-[25] py-[15px] flex justify-between items-center">
          <h1 className="text-[1.4rem] font-semibold">Bộ lọc & Sắp xếp</h1>
          <button onClick={toggleMenu}>
            <HiMiniXMark size={32} color="black" />
          </button>
        </div>

        <hr className=" border-gray-300 mt-[15px]" />

        <form action="">
          <div className="py-[15px]">
            <label className="block font-medium text-[1rem] pointer-events-none">
              Bộ lọc đã chọn
            </label>

            <div className="flex items-center flex-wrap gap-x-[10px] gap-y-[12px] mt-[15px]">
              <div className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer">
                <button>
                  <HiMiniXMark size={18} color="black" />
                </button>
                <span className="text-[0.9rem]">Bán chạy</span>
              </div>

              <div className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer">
                <button>
                  <HiMiniXMark size={18} color="black" />
                </button>
                <span className="text-[0.9rem]">Đang giảm giá</span>
              </div>

              <div className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer">
                <button>
                  <HiMiniXMark size={18} color="black" />
                </button>
                <span className="text-[0.9rem]">Áo sơ mi</span>
              </div>
            </div>
          </div>

          <hr className=" border-gray-300" />

          <div className="cursor-pointer py-[15px]">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-[1rem] uppercase pointer-events-none">
                Sắp xếp theo
              </label>
              <IoIosArrowDown size={18} />
            </div>

            <div className="mt-[15px]">
              <button className="uppercase text-[0.95rem]">
                Giá (thấp-cao)
              </button>
              <hr className="my-[12px] border-gray-300" />
              <button className="uppercase text-[0.95rem]">
                Giá (cao-thấp)
              </button>
              <hr className="my-[12px] border-gray-300" />
              <button className="uppercase text-[0.95rem]">Bán chạy</button>
              <hr className="my-[12px]  border-gray-300" />
              <button className="uppercase text-[0.95rem]">
                Đang giảm giá
              </button>
            </div>
          </div>

          <hr className=" border-gray-300" />

          <div className="cursor-pointer py-[15px]">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-[1rem] uppercase pointer-events-none">
                Giá
              </label>
              <IoIosArrowDown size={18} />
            </div>

            <div className="mt-[15px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="w-full flex h-[35px] items-center">
                  <span>Min</span>
                  <input
                    type="number"
                    className="w-full px-2 py-1 outline-none text-[0.9rem] ml-[12px] border border-gray-600"
                  />
                </div>
                <div className="flex items-center justify-center text-[2rem]">
                  -
                </div>
                <div className="w-full flex h-[35px] items-center">
                  <span>Max</span>
                  <input
                    type="number"
                    className="w-full px-2 py-1  outline-none text-[0.9rem] ml-[12px] border border-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className=" border-gray-300" />

          <div className="cursor-pointer py-[15px]">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-[1rem] uppercase pointer-events-none">
                Loại
              </label>
              <IoIosArrowDown size={18} />
            </div>

            <div className="mt-[15px]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-[10px] w-[20px] h-[20px]"
                  name="type[]"
                  value="shirt"
                  id="shirt1"
                  defaultChecked
                />
                <label
                  htmlFor="shirt1"
                  className="relative cursor-pointer inline-block leading-[20px] text-[0.9rem]"
                >
                  Áo sơ mi
                </label>
                <span className="text-gray-500 mx-[5px] text-[0.9rem]">
                  (7)
                </span>
              </div>

              <div className="flex items-center mt-[15px]">
                <input
                  type="checkbox"
                  className="mr-[10px] w-[20px] h-[20px]"
                  name="type[]"
                  value="shirt"
                  id="shirt2"
                  defaultChecked
                />
                <label
                  htmlFor="shirt2"
                  className="relative cursor-pointer inline-block leading-[20px] text-[0.9rem]"
                >
                  Áo thun
                </label>
                <span className="text-gray-500 mx-[5px] text-[0.9rem]">
                  (7)
                </span>
              </div>
            </div>
          </div>

          <hr className=" border-gray-300" />

          <div className="cursor-pointer py-[15px]">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-[1rem] uppercase pointer-events-none">
                Giới tính
              </label>
              <IoIosArrowDown size={18} />
            </div>

            <div className="mt-[15px] capitalize">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-[10px] w-[20px] h-[20px]"
                  name="gender[]"
                  value="nam"
                  id="nam"
                  defaultChecked
                />
                <label
                  htmlFor="nam"
                  className="relative cursor-pointer inline-block leading-[20px] text-[0.9rem] capitalize"
                >
                  nam
                </label>
              </div>

              <div className="flex items-center mt-[15px]">
                <input
                  type="checkbox"
                  className="mr-[10px] w-[20px] h-[20px]"
                  name="gender[]"
                  value="nữ"
                  id="nu"
                />
                <label
                  htmlFor="nu"
                  className="relative cursor-pointer inline-block leading-[20px] text-[0.9rem] capitalize"
                >
                  nữ
                </label>
              </div>
            </div>
          </div>

          <hr className=" border-gray-300 mb-[15px]" />

          <div className="sticky bottom-0 overflow-hidden bg-white z-[25] h-[75px] py-[15px]">
            <button
              type="submit"
              className="bg-black text-white px-[25px] py-[12px] w-full text-[1rem] flex justify-center items-center gap-2.5 font-bold"
            >
              Áp dụng
              <FaArrowRightLong size={22} />
            </button>
          </div>
        </form>
      </div>

      {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
    </>
  );
}

export default AdvancedSearch;
