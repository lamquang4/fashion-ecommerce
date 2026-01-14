"use client";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import BarChart from "./BarChart";
import TopProduct from "./TopProduct";
import { PiTShirtBold } from "react-icons/pi";
import useGetOrders from "@/hooks/useGetOrders";
import StaticCards from "../StaticCards";

function Dashboard() {
  const { totalRevenue, totalSold } = useGetOrders();

  const array1 = [
    {
      title: "Tổng doanh thu",
      number: `${totalRevenue.toLocaleString("vi-VN")}₫`,
      icon1: <FaRegMoneyBillAlt size={25} />,
    },
    {
      title: "Tất cả số lượng bán ra",
      number: totalSold,
      icon1: <PiTShirtBold size={25} />,
    },
  ];
  return (
    <>
      <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9] space-y-[20px]">
        <h2 className=" text-[#74767d]">Đơn hàng</h2>

        <StaticCards array={array1} />
      </div>

      <BarChart />

      <TopProduct />
    </>
  );
}

export default Dashboard;
