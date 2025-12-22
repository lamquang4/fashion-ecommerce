"use client";
import useGetCoupons from "@/hooks/useGetCoupons";
import Overplay from "./Overplay";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { memo } from "react";
type Props = {
  isOpen: boolean;
  onToggleMenu: () => void;
};
function MenuSideCoupon({ isOpen, onToggleMenu }: Props) {
  const { coupons } = useGetCoupons();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Sao chép mã thành công");
  };

  return (
    <>
      <div
        className={`custom-scroll fixed top-0 right-0 w-full max-w-[400px] h-screen overflow-y-auto bg-white z-[25] px-[15px] transform transition-transform duration-350 ease-in-out ${
          isOpen ? "translate-x-[0px]" : "translate-x-[400px]"
        }`}
      >
        <div className="sticky top-0 overflow-hidden bg-white py-[15px] flex justify-between items-center border-b border-gray-300">
          <h4 className="uppercase">Phiếu giảm giá</h4>
          <button onClick={onToggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x-icon lucide-x w-3.5"
              viewBox="5 5 14 14"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex gap-[15px] flex-col items-center w-full py-[20px]">
          {coupons.length > 0 &&
            coupons.map((coupon) => (
              <div
                className="relative w-full flex overflow-hidden bg-[#197FB6]"
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

                <div className="border border-[#197FB6] px-[25px] relative w-full">
                  <div className="flex items-center border-l border-r px-3 py-4 border-[#197FB6] w-full bg-white">
                    <div className="flex gap-2 flex-col w-full">
                      <h3 className="uppercase text-[#197FB6]">
                        {coupon.discountType === 1
                          ? `Giảm ${coupon.discountValue.toLocaleString(
                              "vi-VN"
                            )}₫`
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
                      <div className="flex justify-between items-center w-full">
                        <p className="font-medium ">Nhập mã: {coupon.code}</p>
                        <button
                          className="border text-[0.9rem] font-medium p-2 bg-[#197FB6] text-white rounded-sm"
                          onClick={() => {
                            handleCopy(coupon.code);
                          }}
                        >
                          <MdContentCopy />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isOpen && <Overplay onClose={onToggleMenu} IndexForZ={15} />}
    </>
  );
}

export default memo(MenuSideCoupon);
