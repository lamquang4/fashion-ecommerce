"use client";
import TopProduct from "./TopProduct";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { PiTShirtBold } from "react-icons/pi";
import dynamic from "next/dynamic";
import StaticCards from "./StaticCards";
import useGetOrders from "@/hooks/useGetOrders";
import useGetCustomers from "@/hooks/useGetCustomers";
import { useMemo, useState } from "react";
import useGetRevenues from "@/hooks/useGetRevenues";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
function Dashboard() {
  const startYear = 2025;
  const [year, setYear] = useState<number>(startYear);
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 2;

  const { orders, totalRevenue, totalSold } = useGetOrders();
  const { revenues } = useGetRevenues(year);
  const { customers } = useGetCustomers();

  const monthlyRevenueData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthData = revenues?.revenues?.find((r) => r.month === i + 1);
      return monthData ? monthData.totalRevenue : 0;
    });
  }, [revenues]);

  const monthlySoldData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthData = revenues?.revenues?.find((r) => r.month === i + 1);
      return monthData ? monthData.totalQuantity : 0;
    });
  }, [revenues]);

  const totalRevenueYear = useMemo(() => {
    return monthlyRevenueData.reduce((sum, value) => sum + value, 0);
  }, [monthlyRevenueData]);

  const totalSoldYear = useMemo(() => {
    return monthlySoldData.reduce((sum, value) => sum + value, 0);
  }, [monthlySoldData]);

  const array = [
    {
      title: "Doanh thu",
      number: `${totalRevenue.toLocaleString("vi-VN")}₫`,
      icon1: <FaRegMoneyBillAlt size={25} />,
    },
    {
      title: "Tổng đơn",
      number: orders.length,
      icon1: <RiShoppingBag4Line size={25} />,
    },
    {
      title: "Khách hàng",
      number: customers.length,
      icon1: <IoPeopleOutline size={25} />,
    },
    {
      title: "Số lượng bán ra",
      number: totalSold,
      icon1: <PiTShirtBold size={25} />,
    },
  ];

  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h2 className="mb-[20px] text-[#74767d]">Thống kê</h2>

        <StaticCards array={array} />
      </div>

      <div className="bg-white">
        <div className="py-[1.3rem] px-[1.2rem] flex flex-col gap-[1.3rem]">
          <div className="flex items-center gap-2">
            <h2 className="text-[#74767d]">Năm</h2>
            {
              <select
                onChange={(e) => setYear(Number(e.target.value))}
                value={year}
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] bg-white outline-none focus:border-gray-400 text-gray-900"
              >
                {Array.from({ length: endYear - startYear + 1 }, (_, i) => {
                  const y = startYear + i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            }
          </div>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h5 className="font-semibold text-[#74767d]">
              Tổng doanh thu:{" "}
              <span className="text-[#c00]">
                {totalRevenueYear.toLocaleString("vi-VN")}₫
              </span>
            </h5>
            <h5 className="font-semibold text-[#74767d]">
              Tổng số lượng bán ra:{" "}
              <span className="text-[#c00]">{totalSoldYear}</span>
            </h5>
          </div>
        </div>

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
              data: monthlyRevenueData, // dữ liệu doanh thu
            },
            {
              name: "Số lượng bán ra",
              type: "line",
              data: monthlySoldData, // dữ liệu sl bán ra
            },
          ]}
          type="line"
          width="100%"
          height={400}
        />

        <TopProduct />
      </div>
    </>
  );
}

export default Dashboard;
