"use client";
import Link from "next/link";
import React from "react";

function AddAdmin() {
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full">
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Thêm quản trị viên
        </h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d]">
              Thông tin chung
            </p>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Họ tên
              </label>
              <input
                type="text"
                name="fullname"
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Email
              </label>
              <input
                type="text"
                name="email"
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  name="phone"
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Sinh nhật
                </label>
                <input
                  type="date"
                  name="birthday"
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Chức vụ
              </label>
              <select
                name="role"
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              >
                <option value="">Chọn chức vụ</option>
                <option value="0">Siêu quản trị viên</option>
                <option value="1">Nhân viên bán hàng</option>
                <option value="2">Nhân viên nội dung</option>
                <option value="3">Kế toán</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="submit"
            className="w-[75px] bg-teal-500 text-white text-[0.9rem] py-2 "
          >
            Thêm
          </button>
          <Link
            href="/customer"
            className="w-[75px] bg-red-500 text-white text-[0.9rem] py-2 text-center"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
