"use client";
import React from "react";
import { HiMiniXMark } from "react-icons/hi2";
import Overplay from "./Overplay";
interface AddressModalProp {
  isOpen: boolean;
  toggleMenu: () => void;
}
const AddressModal: React.FC<AddressModalProp> = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <div className="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 h-full">
        <div className="relative w-full max-w-lg max-h-full">
          <div className="relative  p-[25px_15px] bg-white z-20">
            <div className="flex items-center justify-between">
              <h2 className="text-[1.2rem] font-semibold text-gray-900  uppercase">
                Địa chỉ mới
              </h2>
              <button
                type="button"
                className="text-gray-600 bg-transparent hover:text-black ms-auto"
                onClick={toggleMenu}
              >
                <HiMiniXMark size={25} />
              </button>
            </div>

            <hr className=" border-slate-300 my-[15px]" />

            <form className="">
              <div className="grid gap-4 mb-[20px] grid-cols-2">
                <div className="col-span-2 w-full">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                    placeholder="Họ và tên"
                  />
                </div>

                <div className="col-span-2 w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div className="col-span-2 w-full">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                  >
                    Địa chỉ cụ thể
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                    placeholder="Địa chỉ cụ thể"
                  />
                </div>

                <div className="col-span-2 w-full">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Thành phố
                  </label>
                  <select
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                  >
                    <option value="">Hà Nội</option>
                  </select>
                </div>

                <div className="col-span-1 w-full">
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quận
                  </label>
                  <select
                    id="district"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                  >
                    <option value="">Quận 6</option>
                  </select>
                </div>

                <div className="col-span-1 w-full">
                  <label
                    htmlFor="ward"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phường
                  </label>
                  <select
                    id="ward"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                  >
                    <option value="hanoi">Phường 6</option>
                  </select>
                </div>

                <div className="col-span-1 w-full flex items-center">
                  <input
                    id="default-check"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                  />
                  <label
                    htmlFor="default-check"
                    className="ms-2 text-[0.9rem] font-medium text-gray-900 dark:text-gray-300"
                  >
                    Đặt là địa chỉ mặc định?
                  </label>
                </div>
              </div>

              <div className="flex gap-[15px]">
                <button
                  type="submit"
                  className="px-[14px] py-[8px] bg-red-600 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-red-700"
                >
                  Thêm địa chỉ
                </button>

                <button
                  type="button"
                  onClick={toggleMenu}
                  className="px-[14px] py-[8px] bg-transparent text-black border border-gray-300 text-[0.9rem] font-medium text-center rounded-sm hover:bg-gray-100"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>

          {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
        </div>
      </div>
    </>
  );
};

export default AddressModal;
