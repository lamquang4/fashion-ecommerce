"use client";
import useAddCoupon from "@/hooks/useAddCoupon";
import { validatePositiveInt } from "@/utils/validtePositiveInt";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddCoupon() {
  const [data, setData] = useState({
    code: "",
    limit: 1,
    amount: 1,
    discountType: "",
    discountValue: 1,
    startDate: "",
    expiryDate: "",
    minOrderValue: 1,
    maxDiscountValue: 1,
  });

  const { addCoupon } = useAddCoupon();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(data.startDate);
    const expiry = new Date(data.expiryDate);
    const now = new Date();

    if (start < now) {
      toast.error("Ngày bắt đầu không được sau ngày hiện tại");
      return;
    }

    if (start >= expiry) {
      toast.error("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }

    if (!validatePositiveInt(data.amount)) {
      toast.error("Số lượng phải là số nguyên dương");
      return;
    }

    if (!validatePositiveInt(data.limit)) {
      toast.error("Số lần dùng phải là số nguyên dương");
      return;
    }

    if (!validatePositiveInt(data.discountValue)) {
      toast.error("Giá trị giảm giá phải là số nguyên dương");
      return;
    }

    if (!validatePositiveInt(data.minOrderValue)) {
      toast.error("Giá trị đơn hàng tối thiểu phải là số nguyên dương");
      return;
    }

    if (data.discountType === "0") {
      if (!validatePositiveInt(Number(data.maxDiscountValue))) {
        toast.error("Giá trị giảm tối đa (áp dụng %) phải là số nguyên dương");
        return;
      }
    }

    try {
      await addCoupon({
        code: data.code.toUpperCase(),
        limit: data.limit,
        amount: data.amount,
        discountType: parseInt(data.discountType),
        discountValue:
          data.discountType === "1" ? 0 : parseInt(data.discountType),
        startDate: new Date(data.startDate),
        expiryDate: new Date(data.expiryDate),
        minOrderValue: data.minOrderValue,
        maxDiscountValue: data.maxDiscountValue,
      });
      toast.success("Thêm thành công!");
      setData({
        code: "",
        limit: 1,
        amount: 1,
        discountType: "",
        discountValue: 1,
        startDate: "",
        expiryDate: "",
        minOrderValue: 1,
        maxDiscountValue: 1,
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Thêm phiếu giảm giá
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
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900 uppercase"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-[0.95rem] text-black">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={data.amount}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-[0.95rem] text-black">
                    Số lần dùng
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
              </div>
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

            {data.discountType !== "1" && (
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  {`Giá trị ${
                    data.discountType === "0" ? "phần trăm" : "tiền cố định"
                  } giảm giá `}
                </label>
                <input
                  type="number"
                  name="discountValue"
                  value={data.discountValue}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900 w-full"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.95rem] text-black">
                Giá trị đơn hàng tối thiểu (điều kiện áp dụng phiếu)
              </label>
              <input
                type="number"
                name="minOrderValue"
                value={data.minOrderValue}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            {data.discountType === "0" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Giá trị giảm tối đa (áp dụng %)
                </label>
                <input
                  type="number"
                  name="maxDiscountValue"
                  value={data.maxDiscountValue}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>
            )}

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Ngày bắt đầu
                </label>
                <input
                  type="datetime-local"
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
                  type="datetime-local"
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
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            Thêm
          </button>
          <Link
            href="/coupon"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
