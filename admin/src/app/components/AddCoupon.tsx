"use client";
import Link from "next/link";
import React from "react";

function AddCoupon() {
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px]">
      <form className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-[1.85rem] text-[#74767d]">
          Thêm phiếu giảm giá
        </h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Mã giảm giá
          </label>
          <input
            type="text"
            name="code"
            maxLength={20}
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Số lượng tối đa
          </label>
          <input
            type="number"
            name="limitCoupon"
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Loại giảm giá
          </label>
          <select
            name="typeCoupon"
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          >
            <option value="">Chọn loại giảm giá</option>
            <option value="free">Miễn phí giao hàng</option>
            <option value="%">Phần trăm %</option>
            <option value="money">Số tiền cố định</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[0.95rem] text-black">
            Giá trị giảm giá
          </label>
          <input
            type="text"
            name="valueCoupon"
            required
            className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
          />
        </div>

        <div className="flex gap-5">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="" className="text-[0.95rem] text-black">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              name="startDate"
              required
              className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="" className="text-[0.95rem] text-black">
              Ngày kết thúc
            </label>
            <input
              type="date"
              name="endDate"
              required
              className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            type="submit"
            className="w-[75px] bg-teal-500 text-white text-[0.9rem] py-2 "
          >
            Thêm
          </button>
          <Link
            href="/coupon"
            className="w-[75px] bg-red-500 text-white text-[0.9rem] py-2 text-center"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
