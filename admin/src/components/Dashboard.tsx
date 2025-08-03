"use client";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { PiTShirtBold } from "react-icons/pi";
import Image from "./Image";
import dynamic from "next/dynamic";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Link from "next/link";
import StaticCards from "./StaticCards";
import useGetOrders from "@/hooks/useGetOrders";
import useGetCustomers from "@/hooks/useGetCustomers";
import Loading from "./Loading";
import useGetTop10Products from "@/hooks/useGetTop10Products";
import { useState } from "react";
import useGetRevenues from "@/hooks/useGetRevenues";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
function Dashboard() {
  const { orders, totalRevenue, totalSold } = useGetOrders();
  const { customers } = useGetCustomers();
  const { topProducts, isLoading } = useGetTop10Products();

  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const endYear = currentYear + 2;

  const [year, setYear] = useState<number>(startYear);
  const { revenues } = useGetRevenues(year);

  const monthlyRevenueData = Array.from({ length: 12 }, (_, i) => {
    const monthData = revenues?.revenues?.find((r) => r.month === i + 1);
    return monthData ? monthData.totalRevenue : 0;
  });

  const monthlySoldData = Array.from({ length: 12 }, (_, i) => {
    const monthData = revenues?.revenues?.find((r) => r.month === i + 1);
    return monthData ? monthData.totalQuantity : 0;
  });

  const totalRevenueYear = monthlyRevenueData.reduce(
    (sum, value) => sum + value,
    0
  );
  const totalSoldYear = monthlySoldData.reduce((sum, value) => sum + value, 0);

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
        <StaticCards array={array} />
      </div>

      <div className="bg-white">
        <div className="py-[1.3rem] px-[1.2rem] flex flex-col gap-[1.3rem]">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-[1.5rem] text-[#74767d]">
              Thống kê năm
            </h1>
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
            <h2 className="font-semibold text-[1rem] text-[#74767d]">
              Tổng doanh thu:{" "}
              <span className="text-[#c00]">
                {totalRevenueYear.toLocaleString("vi-VN")}₫
              </span>
            </h2>
            <h2 className="font-semibold text-[1rem] text-[#74767d]">
              Tổng số lượng bán ra:{" "}
              <span className="text-[#c00]">{totalSoldYear}</span>
            </h2>
          </div>
        </div>

        <div className="bg-white">
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
        </div>
      </div>

      <div>
        <div className="py-[1.3rem] px-[1.2rem] bg-white">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Top 10 bán chạy nhất
          </h1>
        </div>

        <div className=" bg-white w-full overflow-auto">
          <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
            <thead>
              <tr className="bg-[#E9EDF2]">
                <th className="py-[1rem] pl-[1rem] text-left text-[#444] text-[0.9rem]">
                  Sản phẩm
                </th>

                <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                  Giá
                </th>

                <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                  Số lượng
                </th>

                <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                  Màu sắc
                </th>

                <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                  Danh mục
                </th>

                <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="w-full">
                    <Loading height={50} />
                  </td>
                </tr>
              ) : topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="pl-[1rem] py-[1rem] w-[300px]">
                      <div className="flex gap-[10px] items-center">
                        <div className="cursor-pointer">
                          <Image
                            Src={product.variants[0].images[0]}
                            Alt={""}
                            ClassName={"w-[75px] cursor-pointer"}
                            loadingType="lazy"
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <p className="text-[0.9rem] font-medium  text-[#444]">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-[1rem] text-[0.9rem]  text-[#444]">
                      <div className="flex flex-col">
                        <span
                          className={` ${
                            product.discount > 0
                              ? "line-through text-gray-400"
                              : "text-black"
                          } `}
                        >
                          {product.price?.toLocaleString("vi-VN")}₫
                        </span>
                        {product.discount > 0 && (
                          <span className="text-red-500 font-semibold">
                            {product.discount?.toLocaleString("vi-VN")}₫
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-[1rem] text-[0.9rem] text-[#444]">
                      <div className="flex flex-col gap-1.5">
                        <p>Còn lại: {product.totalQuantity}</p>
                        <p>Đã bán: {product.totalSold}</p>
                      </div>
                    </td>

                    <td className="py-[1rem] text-[0.9rem] text-[#444]">
                      <div className="flex gap-1.5">
                        {product.variants.map((variant, index) => (
                          <div
                            className="w-5 h-5 border-gray-400 border rounded-full"
                            style={{
                              backgroundColor: variant.color?.codecolor,
                            }}
                            key={index}
                            title={variant.color?.namecolor}
                          ></div>
                        ))}
                      </div>
                    </td>

                    <td className="py-[1rem] text-[0.9rem] text-[#444]">
                      {product.category.namecategory}/
                      {product.category.gender === 1 ? "Nam" : "Nữ"}
                    </td>

                    <td className="py-[1rem] text-[0.9rem] text-[#444]">
                      <div className="flex items-center gap-[15px]">
                        <Link href={`/edit-product/${product._id}`}>
                          <LiaExternalLinkAltSolid
                            size={23}
                            className="text-[#076ffe]"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="w-full h-[70vh]">
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        Src={"/assets/other/notfound1.png"}
                        Alt={""}
                        ClassName={"w-[180px]"}
                        loadingType="lazy"
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
