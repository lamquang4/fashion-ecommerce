import { Coupon } from "@/types/type";
import { memo } from "react";

type Props = {
  coupons: Coupon[];
  onToggleCouponMenu: () => void;
};

function CouponList({ coupons, onToggleCouponMenu }: Props) {
  if (!coupons || coupons.length === 0) return null;
  return (
    <div className="space-y-[8px]">
      <p className="text-gray-700 font-medium mb-[5px]">Mã giảm giá</p>

      <div className="flex gap-[12px] flex-wrap w-full">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            onClick={onToggleCouponMenu}
            className="relative flex rounded-none filter-none min-h-0 overflow-hidden px-0 cursor-pointer
              before:content-[''] before:absolute before:rounded-full before:w-[12px] before:h-[12px]
              before:bg-white before:border before:border-[#197FB6]
              before:top-1/2 before:-translate-y-1/2 before:left-[-6px] before:z-[10]
              after:content-[''] after:absolute after:rounded-full after:w-[12px] after:h-[12px]
              after:bg-white after:border after:border-[#197FB6]
              after:top-1/2 after:-translate-y-1/2 after:right-[-6px] after:z-[10]"
          >
            <div className="border border-[#197FB6] text-[#197FB6] px-3 py-[7px] relative text-[0.9rem] font-medium uppercase">
              {coupon.discountType === 1 &&
                `Giảm ${coupon.discountValue.toLocaleString("vi-VN")}₫`}

              {coupon.discountType === 0 && `Giảm ${coupon.discountValue}%`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(CouponList);
