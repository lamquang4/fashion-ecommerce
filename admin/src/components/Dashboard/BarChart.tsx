"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import useGetRevenues from "@/hooks/useGetRevenues";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
function BarChart() {
  const startYear = 2025;
  const [year, setYear] = useState<number>(startYear);
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 2;

  const { revenues } = useGetRevenues(year);

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
  return (
    <div className="space-y-[1.3rem]">
      <div className="py-[1.3rem] px-[1.2rem] space-y-[20px]">
        <div className="flex items-center gap-2">
          <h2 className="text-[#74767d]">Năm</h2>

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
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
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

      <div>
        <ApexChart
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
      </div>
    </div>
  );
}

export default BarChart;
