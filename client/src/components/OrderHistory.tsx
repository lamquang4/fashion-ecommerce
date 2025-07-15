"use client";
import SideBarMenu from "./SideBarMenu";
import Link from "next/link";
import Image from "./Image";

function OrderHistory() {
  return (
    <section className="w-full mt-[40px] sm:mt-[45px]">
      <div className="flex justify-center flex-wrap px-[10px] sm:px-[15px]">
        <SideBarMenu />

        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          <div className="p-[25px_15px] sm:p-[30px_20px]">
            <h2 className="text-[1.5rem] font-semibold mb-[25px]">Đơn hàng</h2>

            <div className="border-[1.5px] border-double border-gray-300 p-[15px] pt-0">
              <div className="relative flex items-center py-[15px] border-b-[1.5px] border-b-double border-gray-300 gap-[10px]">
                <div>
                  <Image
                    Src={"/assets/products/IMGSP3483.png"}
                    Alt={""}
                    ClassName={"max-w-[120px] round-[5px] object-cover"}
                    loadingType="eager"
                  />
                </div>

                <div>
                  <h2 className="text-[0.85rem] sm:text-[0.95rem] font-medium mb-[10px]">
                    Áo sơ mi Leweu Kio
                  </h2>
                  <div className="flex gap-[15px] items-center flex-wrap">
                    <div className="flex gap-[15px] text-[0.85rem] sm:text-[0.95rem]">
                      <span>x1</span>
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
                    loadingType="eager"
                  />
                </div>

                <div>
                  <h2 className="text-sm sm:text-base font-medium mb-[10px]">
                    Áo sơ mi Leweu Kio
                  </h2>
                  <div className="flex gap-[15px] items-center flex-wrap">
                    <div className="flex gap-[15px]">
                      <span>x1</span>
                      <span>S / Đen</span>
                    </div>

                    <div className="">
                      <span>290,000₫</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-500 mt-[15px] text-[0.95rem] font-medium">
                  Đang xử lí
                </p>

                <div className="flex justify-between items-center mt-[15px]">
                  <span className="text-black text-[1rem] font-medium">
                    Tổng cộng: 600,000₫
                  </span>

                  <Link
                    href="/order-detail"
                    className="text-[#3b82f6] text-[0.9rem] px-[10px] py-[6px] transition-[0.3s] border border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/*
   <div className="flex justify-center items-center h-[60vh]">
                <div>
                  <div className="mb-[20px] flex justify-center">
                    <Image
                      Src={"/assets/other/empty-order.png"}
                      Alt={""}
                      ClassName={"w-[190px]"}
                    />
                  </div>

                  <div className="flex justify-center flex-col gap-3 items-center text-center">
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
