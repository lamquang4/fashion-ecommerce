"use client";
import Link from "next/link";
import React, { useState } from "react";

function EditCoupon() {
  const [data, setData] = useState({
    code: "",
    limit: "",
    discountType: "",
    value: "",
    startDate: "",
    expiryDate: "",
    minOrderValue: "",
    maxDiscountValue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full">
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Chỉnh sửa phiếu giảm giá
        </h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d]">
              Thông tin chung
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.95rem] text-black">
                Mã giảm giá
              </label>
              <input
                type="text"
                name="code"
                value={data.code}
                onChange={handleChange}
                maxLength={12}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.95rem] text-black">
                Số lượng tối đa
              </label>
              <input
                type="number"
                name="limit"
                value={data.limit}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.95rem] text-black">
                Loại giảm giá
              </label>
              <select
                name="discountType"
                value={data.discountType}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              >
                <option value="">Chọn loại giảm giá</option>
                <option value="1">Miễn phí giao hàng</option>
                <option value="0">Phần trăm %</option>
                <option value="2">Số tiền cố định</option>
              </select>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Giá trị giảm giá
                </label>
                <input
                  type="text"
                  name="value"
                  value={data.value}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900 w-full"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Giá trị giảm giá tối đa
                </label>
                <input
                  type="text"
                  name="maxDiscountValue"
                  value={data.maxDiscountValue}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.95rem] text-black">
                Giá trị đơn hàng tối thiểu
              </label>
              <input
                type="number"
                name="minOrderValue"
                value={data.minOrderValue}
                onChange={handleChange}
                maxLength={12}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
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
                  value={data.startDate}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={data.expiryDate}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="submit"
            className="px-[14px] py-[8px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            Cập nhật
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

export default EditCoupon;
