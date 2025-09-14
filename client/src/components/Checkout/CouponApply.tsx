"use client";
import { Coupon } from "@/types/type";
import { memo } from "react";

type Props = {
  toggleOpen: () => void;
  setCouponCode: (value: string) => void;
  handleApplyCoupon: () => void;
  coupon: Coupon;
  isLoadingCoupon: boolean;
};

function CouponApply({
  toggleOpen,
  setCouponCode,
  handleApplyCoupon,
  coupon,
  isLoadingCoupon,
}: Props) {
  return (
    <div className="space-y-[15px]">
      <div className="flex justify-between flex-wrap gap-[15px] items-center mb-[5px]">
        <h5 className="font-medium">Phiếu giảm giá</h5>

        <button
          type="button"
          className="underline text-[0.9rem]"
          onClick={toggleOpen}
        >
          Xem tất cả
        </button>
      </div>

      <div className="flex gap-[15px] items-center">
        <input
          type="text"
          id="discount"
          name="discount"
          className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:border-blue-500 focus:ring-blue-500"
          placeholder="Mã giảm giá"
          onChange={(e) => {
            setCouponCode(e.target.value);
          }}
        />

        <button
          type="button"
          disabled={isLoadingCoupon}
          onClick={() => handleApplyCoupon()}
          className="w-[120px] text-[0.9rem] rounded-md bg-[#197FB6] py-2 font-medium text-white"
        >
          Sử dụng
        </button>
      </div>

      {coupon && (
        <div className="relative w-full flex rounded-none filter-none min-h-0 overflow-hidden px-0 bg-[#197FB6]">
          <div className="absolute left-[-6px] top-[16.6%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
          <div className="absolute left-[-6px] top-[38%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
          <div className="absolute left-[-6px] top-[61%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
          <div className="absolute left-[-6px] top-[83.4%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>

          <div className="absolute right-[-6px] top-[16.6%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
          <div className="absolute right-[-6px] top-[38%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
          <div className="absolute right-[-6px] top-[61%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
          <div className="absolute right-[-6px] top-[83.4%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>

          <div className="border border-[#197FB6] text-[#197FB6] px-[25px] relative w-full">
            <div className="flex items-center border-l border-r px-3 py-4 border-[#197FB6] w-full bg-white">
              <div className="flex gap-2 flex-col w-full">
                <h3 className="uppercase">
                  {coupon.discountType === 1
                    ? `Giảm ${coupon.discountValue.toLocaleString("vi-VN")}₫`
                    : coupon.discountType === 0
                    ? `Giảm ${coupon.discountValue}%`
                    : ""}
                </h3>

                <p className="font-medium  ">
                  {coupon.minOrderValue
                    ? `Đơn hàng phải từ ${coupon.minOrderValue.toLocaleString(
                        "vi-VN"
                      )}₫ trở lên`
                    : "Mọi đơn hàng"}
                  {coupon.discountType === 0 &&
                    coupon.maxDiscountValue &&
                    `, giảm tối đa ${coupon.maxDiscountValue.toLocaleString(
                      "vi-VN"
                    )}₫`}
                </p>

                <p className="font-medium  ">Mã: {coupon.code}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(CouponApply);
