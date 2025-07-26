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

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
function Dashboard() {
  const { orders, totalRevenue, totalSold } = useGetOrders();
  const { customers } = useGetCustomers();
  const { topProducts, isLoading } = useGetTop10Products();
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
      title: "Số lượng đã bán",
      number: totalSold,
      icon1: <PiTShirtBold size={25} />,
    },
  ];

  console.log(topProducts);

  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <StaticCards array={array} />
      </div>

      <div className="bg-[#f1f4f9]">
        <div className="px-[1.2rem] pb-[1.3rem]">
          <form action="">
            <div className="flex gap-[15px] flex-wrap">
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

              <div>
                <button className="p-[6px_10px] text-[0.9rem] bg-[#22BAA0] text-white">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </form>
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

      <div className="p-[1.3rem] px-[1.2rem] bg-white">
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Top 10 bán chạy nhất
        </h1>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
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
    </>
  );
}

export default Dashboard;
