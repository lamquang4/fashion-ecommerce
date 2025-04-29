"use client";
import React from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { PiTShirtBold } from "react-icons/pi";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
function Dashboard() {
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6 mb-[25px]">
          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Doanh thu</p>
              <p className="mt-0.5 text-xl font-medium">30tr500</p>
              <p className=" mt-3 flex items-center text-red-500">
                <IoIosArrowRoundDown size={25} />
                <span>1.3%</span>
              </p>
            </div>

            <div className="relative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase  rounded-none">
                <FaRegMoneyBillAlt size={25} />
              </div>
            </div>
          </div>

          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Tổng đơn</p>
              <p className="mt-0.5 text-xl font-medium">7500</p>
              <p className="mt-3 flex items-center text-[#029A67]">
                <IoIosArrowRoundUp size={25} />
                <span>2.3%</span>
              </p>
            </div>

            <div className="elative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase rounded-none">
                <RiShoppingBag4Line size={25} />
              </div>
            </div>
          </div>

          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Khách hàng</p>
              <p className="mt-0.5 text-xl font-medium">210</p>
              <p className="mt-3 flex items-center text-[#029A67]">
                <IoIosArrowRoundUp size={25} />
                <span>1%</span>
              </p>
            </div>

            <div className="elative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase rounded-none">
                <IoPeopleOutline size={25} />
              </div>
            </div>
          </div>

          <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white">
            <div>
              <p>Số lượng đã bán</p>
              <p className="mt-0.5 text-xl font-medium">100</p>
              <p className="mt-3 flex items-center text-[#029A67]">
                <IoIosArrowRoundUp size={25} />
                <span>2.2%</span>
              </p>
            </div>

            <div className="elative inline-flex shrink-0">
              <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase  rounded-none">
                <PiTShirtBold size={25} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[15px] mb-[25px] flex-wrap">
          <div className="relative flex gap-1.5 items-center">
            <label htmlFor="" className="text-[0.9rem] text-black">
              Từ:
            </label>
            <input
              name="startDate"
              type="date"
              className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400 text-gray-900"
            />
          </div>

          <div className="relative flex gap-1.5 items-center">
            <label htmlFor="" className="text-[0.9rem] text-black">
              Đến:
            </label>
            <input
              name="endDate"
              type="date"
              className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400 text-gray-900"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f4f9]">
        <Chart
          options={{
            chart: {
              id: "mixed-chart",
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: false,
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                  pan: false,
                  reset: true,
                },
              },
            },
            xaxis: {
              categories: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ],
            },
            title: {
              text: "Doanh thu & số lượng bán ra năm 2024",
              align: "left",
              style: {
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Quicksand",
              },
            },
            colors: ["#0AB39C", "#f39c12"],
            stroke: {
              width: [0, 3],
            },
            markers: {
              size: 5,
            },
            yaxis: [
              {
                title: {
                  text: "Doanh thu (VNĐ)",
                  style: {
                    fontFamily: "Quicksand",
                  },
                },
              },
              {
                opposite: true,
                title: {
                  text: "Số lượng bán ra",
                  style: {
                    fontFamily: "Quicksand",
                  },
                },
              },
            ],
          }}
          series={[
            {
              name: "Doanh thu",
              type: "column",
              data: [
                30200000, 49520000, 35250000, 54000000, 67800000, 75800000,
                86800000, 67800000, 35080000, 58780000, 67800000, 75900000,
              ],
            },
            {
              name: "Số lượng bán ra",
              type: "line",
              data: [
                120, 200, 150, 230, 300, 350, 390, 310, 140, 260, 280, 360,
              ],
            },
          ]}
          type="line"
          width="100%"
          height={400}
        />
      </div>
    </>
  );
}

export default Dashboard;
