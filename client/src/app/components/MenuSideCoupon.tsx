"use client";
import React from "react";
import Overplay from "./Overplay";
import { HiMiniXMark } from "react-icons/hi2";
type MenuSideCouponProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};
function MenuSideCoupon({ isOpen, toggleMenu }: MenuSideCouponProps) {
  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full max-w-[400px] h-full overflow-scroll bg-white z-[25] px-[12px] pl-[20px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-[0px]" : "translate-x-[400px]"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="sticky top-0 overflow-hidden bg-white z-[25] py-[15px] flex justify-between items-center">
          <h1 className="text-[1.4rem] font-semibold">Mã giảm giá</h1>
          <button onClick={toggleMenu}>
            <HiMiniXMark size={32} color="black" />
          </button>
        </div>

        <hr className=" border-gray-300 mt-[15px]" />

        <div className="flex gap-[25px] flex-col items-center h-full w-full mt-[30px]">
          <div
            className="relative w-full flex rounded-none filter-none min-h-0 overflow-hidden px-0
    before:content-[''] before:absolute before:rounded-full before:w-[20px] before:h-[20px] before:bg-white before:border before:border-[#001F5D] before:top-1/2 before:translate-y-[-50%] before:left-[-6px] before:z-[10]
    after:content-[''] after:absolute after:rounded-full after:w-[20px] after:h-[20px] after:bg-white after:border after:border-[#001F5D] after:top-1/2 after:translate-y-[-50%] after:right-[-6px] after:z-[10]"
          >
            <div className="border border-[#001F5D] text-[#001F5D] px-[26px] relative text-[0.9rem] font-medium w-full">
              <div className="flex items-center  border-dashed border-l-2 border-r-2 px-3 py-4 border-[#001F5D] w-full">
                <div className="flex gap-2 flex-col w-full">
                  <h2 className="text-[1.3rem] font-semibold uppercase">
                    Giảm 10%
                  </h2>
                  <p className="text-[0.9rem]">
                    Đơn hàng từ 599K trở lên, giảm tối đa 100K
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[0.9rem]">Nhập mã: GIAM10</p>
                    <button className="border text-[0.9rem] px-2 py-1.5 bg-[#001F5D] text-white">
                      Sao chép
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
    </>
  );
}

export default MenuSideCoupon;
