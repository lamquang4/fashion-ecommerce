"use client";
import Link from "next/link";
import React from "react";

function AddCoupon() {
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-[1.8rem] text-[#74767d]">
          Thêm phiếu giảm giá
        </h1>

        <div className="flex gap-[20px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.95rem] text-black">
                Mã giảm giá
              </label>
              <input
                type="text"
                name="code"
                maxLength={20}
                required
                className="border border-gray-400 p-[6px_10px] text-[0.9rem] w-full outline-none"
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
                className="border border-gray-400 p-[6px_10px] text-[0.9rem] w-full outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.95rem] text-black">
                Loại giảm giá
              </label>
              <select
                name="typeCoupon"
                required
                className="border border-gray-400 p-[6px_10px] text-[0.9rem] w-full outline-none"
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
                className="border border-gray-400 p-[6px_10px] text-[0.9rem] w-full outline-none"
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
                  className="border border-gray-400 p-[6px_10px] text-[0.9rem] w-full outline-none"
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
                  className="border border-gray-400 p-[6px_10px] text-[0.9rem] w-full outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            type="submit"
            className="px-[14px] py-[5px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            Thêm
          </button>
          <Link
            href="/coupon"
            className="px-[14px] py-[10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
