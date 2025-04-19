"use client";
import Link from "next/link";
import React from "react";

function AddAdmin() {
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px]">
      <form className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-[1.85rem] text-[#74767d]">
          Thêm quản trị viên
        </h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Họ tên
          </label>
          <input
            type="text"
            name="fullname"
            maxLength={20}
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Email
          </label>
          <input
            type="text"
            name="email"
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Số điện thoại
          </label>
          <input
            type="number"
            name="phone"
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Sinh nhật
          </label>
          <input
            type="date"
            name="birthday"
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex justify-center gap-6 mt-6">
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
