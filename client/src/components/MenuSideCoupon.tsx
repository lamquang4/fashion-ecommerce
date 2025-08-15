"use client";
import useGetCoupons from "@/hooks/useGetCoupons";
import Overplay from "./Overplay";
import { HiMiniXMark } from "react-icons/hi2";
import toast from "react-hot-toast";
import { memo } from "react";
type MenuSideCouponProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};
function MenuSideCoupon({ isOpen, toggleMenu }: MenuSideCouponProps) {
  const { coupons } = useGetCoupons();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Sao chép mã thành công");
  };

  return (
    <>
      <div
        className={`custom-scroll fixed top-0 right-0 w-full max-w-[400px] h-screen overflow-y-auto bg-white z-[25] px-[12px] pl-[20px] transform transition-transform duration-350 ease-in-out ${
          isOpen ? "translate-x-[0px]" : "translate-x-[400px]"
        }`}
      >
        <div className="sticky top-0 overflow-hidden bg-white z-[25] py-[15px] flex justify-between items-center border-b border-gray-300">
          <h1 className="text-[1.4rem] font-semibold">Mã giảm giá</h1>
          <button onClick={toggleMenu}>
            <HiMiniXMark size={32} color="black" />
          </button>
        </div>

        <div className="flex gap-[25px] flex-col items-center w-full py-[30px]">
          {coupons.length > 0 &&
            coupons.map((coupon) => (
              <div
                className="relative w-full flex rounded-none filter-none min-h-0 overflow-hidden px-0 bg-[#197FB6]"
                key={coupon._id}
              >
                <div className="absolute left-[-6px] top-[16.6%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                <div className="absolute left-[-6px] top-[38%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                <div className="absolute left-[-6px] top-[61%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                <div className="absolute left-[-6px] top-[83.4%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>

                <div className="absolute right-[-6px] top-[16.6%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                <div className="absolute right-[-6px] top-[38%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                <div className="absolute right-[-6px] top-[61%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                <div className="absolute right-[-6px] top-[83.4%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>

                <div className="border border-[#197FB6] text-[#197FB6] px-[26px] relative w-full">
                  <div className="flex items-center border-l border-r px-3 py-4 border-[#197FB6] w-full bg-white">
                    <div className="flex gap-2 flex-col w-full">
                      <h2 className="text-[1.3rem] font-semibold uppercase">
                        {coupon.discountType === 1
                          ? `Giảm ${coupon.discountValue.toLocaleString(
                              "vi-VN"
                            )}₫`
                          : coupon.discountType === 0
                          ? `Giảm ${coupon.discountValue}%`
                          : ""}
                      </h2>
                      <p className="text-[0.9rem] font-medium text-black">
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
                      <div className="flex justify-between items-center w-full">
                        <p className="text-[0.9rem] font-medium text-black">
                          Nhập mã: {coupon.code}
                        </p>
                        <button
                          className="border text-[0.9rem] px-2.5 py-1.5 bg-[#197FB6] text-white rounded-sm"
                          onClick={() => {
                            handleCopy(coupon.code);
                          }}
                        >
                          Sao chép
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
    </>
  );
}

export default memo(MenuSideCoupon);
