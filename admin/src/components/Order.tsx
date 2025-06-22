"use client";
import Link from "next/link";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { RiShoppingBag4Line } from "react-icons/ri";
import { RiTruckLine } from "react-icons/ri";
import { LuClock } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";
import StaticCards from "./StaticCards";
import InputSearch from "./InputSearch";
function Order() {
  const array = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Chờ xác nhận",
      status: 0,
    },
    {
      name: "Xác nhận",
      status: 1,
    },
    {
      name: "Đang giao",
      status: 2,
    },
    {
      name: "Giao thành công",
      status: 3,
    },
    {
      name: "Đã hủy",
      status: 4,
    },
  ];

  const array1 = [
    {
      title: "Tổng đơn",
      number: 1500,
      icon1: <RiShoppingBag4Line size={25} />,
      icon2: <IoIosArrowRoundDown size={25} />,
      percent: -1.3,
    },
    {
      title: "Đơn giao thành công",
      number: 5000,
      icon1: <RiTruckLine size={25} />,
      icon2: <IoIosArrowRoundUp size={25} />,
      percent: 2.3,
    },
    {
      title: "Đơn đã hủy",
      number: 210,
      icon1: <TbCancel size={25} />,
      icon2: <IoIosArrowRoundUp size={25} />,
      percent: 1,
    },
    {
      title: "Đơn chờ xác nhận",
      number: 100,
      icon1: <LuClock size={25} />,
      icon2: <IoIosArrowRoundUp size={25} />,
      percent: 2.2,
    },
  ];
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Đơn hàng (20)
        </h1>

        <div className="mb-[25px]">
          <StaticCards array={array1} />
        </div>

        <div>
          <form action="">
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

              <div>
                <button className="p-[6px_10px] text-[0.9rem] bg-[#22BAA0] text-white">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            {
              // <InputSearch />
            }
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] py-[1rem] text-left text-[#444] text-[0.9rem]">
                Mã đơn
              </th>

              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Khách hàng
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Thanh toán
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Tổng cộng
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Ngày tạo
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem] relative">
                {
                  // <FilterDropDownMenu title="Tình trạng" array={array} />
                }
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pl-[1rem] py-[1rem] text-[#22BAA0] font-semibold">
                #OD45876
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">Quang Lam</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">COD</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">250,000₫</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20/4/2025</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <select
                  name="status"
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                >
                  <option value="0">Chờ xác nhận</option>
                  <option value="1">Xác nhận</option>
                  <option value="4">Hủy</option>
                </select>
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <div className="flex items-center gap-[15px]">
                  <Link href={"/order-detail"}>
                    <LiaExternalLinkAltSolid
                      size={23}
                      className="text-[#076ffe]"
                    />
                  </Link>
                </div>
              </td>
            </tr>

            {/*
           <tr>
                <td colSpan="8" className="w-full h-[70vh]">
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
    */}
          </tbody>
        </table>
      </div>

      {
        // <Pagination />
      }
    </>
  );
}

export default Order;
