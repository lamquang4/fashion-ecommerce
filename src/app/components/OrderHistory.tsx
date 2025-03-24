"use client";
import React from "react";
import SideBarMenu from "./SideBarMenu";
import Link from "next/link";
import Image from "./Image";

function OrderHistory() {
  return (
    <section className="w-full mt-[30px] sm:mt-[45px]">
      <div className="flex justify-center flex-wrap gap-[15px] px-[10px] sm:px-[15px]">
        <SideBarMenu />

        <div className="w-full max-w-full border-[1.5px] border-double border-gray-300 lg:max-w-[700px] rounded-sm">
          <div className="p-[25px_15px] sm:p-[30px_20px]">
            <h2 className="text-[1.5rem] font-bold mb-[25px]">Đơn hàng</h2>

            <div className="border-[1.5px] border-double border-gray-300 p-[15px] pt-0">
              <div className="relative flex items-center py-[15px] border-b-[1.5px] border-b-double border-gray-300 gap-[10px]">
                <div>
                  <Image
                    Src={"/assets/products/IMGSP3483.png"}
                    Alt={""}
                    ClassName={"max-w-[120px] round-[5px] object-cover"}
                  />
                </div>

                <div>
                  <h2 className="text-[0.85rem] sm:text-[0.95rem] font-medium mb-[10px]">
                    Jack Hydrangea Melange Shirt
                  </h2>
                  <div className="flex gap-[15px] items-center flex-wrap">
                    <div className="flex gap-[15px] text-[0.85rem] sm:text-[0.95rem]">
                      <span>x3</span>
                      <span>M / Đen</span>
                    </div>

                    <div className="">
                      <span>290,000₫</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center py-[15px] border-b-[1.5px] border-b-double border-gray-300 gap-[10px]">
                <div>
                  <Image
                    Src={"/assets/products/IMGSP3483.png"}
                    Alt={""}
                    ClassName={"max-w-[120px] round-[5px] object-cover"}
                  />
                </div>

                <div>
                  <h2 className="text-sm sm:text-base font-medium mb-[10px]">
                    Jack Hydrangea Melange Shirt
                  </h2>
                  <div className="flex gap-[15px] items-center flex-wrap">
                    <div className="flex gap-[15px]">
                      <span>x3</span>
                      <span>M / Đen</span>
                    </div>

                    <div className="">
                      <span>290,000₫</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-500 mt-[15px] text-[1rem] font-medium">
                  Đang xử lí
                </p>

                <div className="flex justify-between items-center mt-[15px]">
                  <span className="text-black text-[1.1rem] font-medium">
                    Tổng cộng: 490,000₫
                  </span>

                  <button className="text-[#3b82f6] text-[0.9rem] p-[6px_16px] transition-[0.3s] border border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white">
                    <Link href="/order_detail">Chi tiết</Link>
                  </button>
                </div>
              </div>
            </div>

            {/*
   <div className="flex justify-center items-center h-[60vh]">
                <div>
                  <div className="mb-[25px] flex justify-center">
                    <Image
                      Src={"/assets/other/empty-order.png"}
                      Alt={""}
                      ClassName={"w-[190px]"}
                    />
                  </div>

                  <div className="flex justify-center flex-col gap-y-3 items-center">
                    <h2 className="text-[1.3rem] font-medium">
                      Không có đơn hàng nào
                    </h2>
                  </div>
                </div>
              </div>
*/}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderHistory;
