"use client";
import { memo, useEffect } from "react";
import Overplay from "./Overplay";
import Image from "./Image";
import { Size } from "@/types/type";
type props = {
  sizes: Size[];
  isOpen: boolean;
  onToggleMenu: () => void;
};
function SizeChartModal({ sizes, isOpen, onToggleMenu }: props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-20 h-full custom-scroll overflow-y-auto overflow-x-hidden">
        <div className="py-[15px] px-[15px] flex justify-center items-center">
          <div className="relative w-full max-w-[720px] max-h-full">
            <div className="relative sm:p-[25px_20px] p-[25px_15px] bg-white z-20 space-y-[15px] rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="uppercase truncate">
                  Hướng dẫn chọn kích thước
                </h4>

                <button
                  type="button"
                  className=" bg-transparent ms-auto"
                  onClick={onToggleMenu}
                >
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

              <hr className=" border-gray-300" />

              <div className="space-y-[15px]">
                <h5 className="font-semibold">Bảng kích thước</h5>

                <div className=" w-full overflow-auto">
                  <table className="w-[260%] border-collapse sm:w-[180%] xl:w-full border border-gray-200 text-[0.9rem] text-left">
                    <thead>
                      <tr>
                        <th className="p-[1rem] border border-gray-200">
                          Kích thước
                        </th>
                        <th className="p-[1rem] border border-gray-200">
                          Vòng ngực (cm)
                        </th>
                        <th className="p-[1rem] border border-gray-200">
                          Vòng eo (cm)
                        </th>
                        <th className="p-[1rem] border border-gray-200">
                          Vòng mông (cm)
                        </th>
                        <th className="p-[1rem] border border-gray-200">
                          Chiều cao (cm)
                        </th>
                        <th className="p-[1rem] border border-gray-200">
                          Cân nặng (kg)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizes.map((size, idx) => (
                        <tr key={idx} className="font-medium">
                          <td className="p-[1rem] border border-gray-200  font-medium">
                            {size.namesize}
                          </td>

                          <td className="p-[1rem] border border-gray-200 ">
                            {size.chest[0]} - {size.chest[1]}
                          </td>

                          <td className="p-[1rem] border border-gray-200 ">
                            {size.waist[0]} - {size.waist[1]}
                          </td>

                          <td className="p-[1rem] border border-gray-200 ">
                            {size.hip[0]} - {size.hip[1]}
                          </td>

                          <td className="p-[1rem] border border-gray-200 ">
                            {size.height[0]} - {size.height[1]}
                          </td>

                          <td className="p-[1rem] border border-gray-200">
                            {size.weight[0]} - {size.weight[1]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-[15px]">
                <h5 className="font-semibold">Cách lấy số đo</h5>

                <div className="grid gap-[15px] sm:grid-cols-2 grid-cols-1">
                  <div className="space-y-[10px]">
                    <p className="font-semibold">1. Vòng ngực</p>
                    <p className="font-normal">
                      Đo tại phần đầy nhất của vòng ngực, giữ thước dây song
                      song với mặt đất.
                    </p>

                    <p className="font-semibold">2. Vòng eo</p>
                    <p className="font-normal">
                      Đo tại phần nhỏ nhất của vòng eo (thường nằm dưới khung
                      xương sườn và trên xương hông).
                    </p>

                    <p className="font-semibold">3. Vòng mông</p>
                    <p className="font-normal">
                      Đo tại phần đầy nhất của vòng mông, giữ thước dây song
                      song với mặt đất.
                    </p>
                  </div>

                  <div className="flex justify-center sm:justify-end items-center w-full">
                    <Image
                      alt=""
                      src="/assets/other/body-size.png"
                      className="w-auto"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isOpen && <Overplay onClose={onToggleMenu} IndexForZ={15} />}
        </div>
      </div>
    </>
  );
}

export default memo(SizeChartModal);
