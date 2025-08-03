"use client";
import Link from "next/link";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { RiShoppingBag4Line } from "react-icons/ri";
import { RiTruckLine } from "react-icons/ri";
import { LuClock } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import Image from "./Image";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";
import StaticCards from "./StaticCards";
import InputSearch from "./InputSearch";
import useGetOrders from "@/hooks/useGetOrders";
import useUpdateStatusOrder from "@/hooks/useUpdateStatusOrder";
import Loading from "./Loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Order() {
  const {
    orders,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
    setKeyword,
    setStatus,
    totalStatus0,
    totalStatus3,
    totalStatus4,
  } = useGetOrders();

  const { updateStatusOrder } = useUpdateStatusOrder();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleUpdateStatus = async (id: string, status: number) => {
    await updateStatusOrder(id, status);
    mutate();
  };

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
      number: orders.length,
      icon1: <RiShoppingBag4Line size={25} />,
    },
    {
      title: "Đơn giao thành công",
      number: totalStatus3,
      icon1: <RiTruckLine size={25} />,
    },
    {
      title: "Đơn đã hủy",
      number: totalStatus4,
      icon1: <TbCancel size={25} />,
    },
    {
      title: "Đơn chờ xác nhận",
      number: totalStatus0,
      icon1: <LuClock size={25} />,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const start = formData.get("start") as string;
    const end = formData.get("end") as string;

    const params = new URLSearchParams(searchParams.toString());

    if (start) params.set("start", start);
    else params.delete("start");

    if (end) params.set("end", end);
    else params.delete("end");

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Đơn hàng
        </h1>

        <div className="mb-[20px]">
          <StaticCards array={array1} />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-[15px] flex-wrap">
              <div className="relative flex gap-1.5 items-center">
                <label
                  htmlFor=""
                  className="text-[0.9rem] text-black font-medium"
                >
                  Từ:
                </label>
                <input
                  name="start"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <div className="relative flex gap-1.5 items-center">
                <label
                  htmlFor=""
                  className="text-[0.9rem] text-black font-medium"
                >
                  Đến:
                </label>
                <input
                  name="end"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <button className="p-[6px_10px] text-[0.9rem] bg-[#22BAA0] text-white">
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className=" bg-white  w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            <InputSearch onSearchChange={(val) => setKeyword(val)} />
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
                Tổng tiền
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Ngày tạo
              </th>
              <th className=" text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  onFilterChange={(val) => setStatus(val)}
                />
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
            ) : orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem] text-[#22BAA0] font-semibold">
                    {order.orderCode}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {order.fullname}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {order.paymethod === 1 ? "MoMo" : "COD"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {order.total.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <select
                      name="status"
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order._id, parseInt(e.target.value))
                      }
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                    >
                      {order.status === 0 && (
                        <>
                          <option value="0">Chờ xác nhận</option>
                          <option value="1">Xác nhận</option>
                          <option value="4">Hủy</option>
                        </>
                      )}
                      {order.status === 1 && (
                        <>
                          <option value="1">Xác nhận</option>
                          <option value="2">Đang giao</option>
                          <option value="4">Hủy</option>
                        </>
                      )}
                      {order.status === 2 && (
                        <>
                          <option value="2">Đang giao</option>
                          <option value="3">Giao thành công</option>
                          <option value="4">Hủy</option>
                        </>
                      )}
                      {order.status === 3 && (
                        <option value="3">Giao thành công</option>
                      )}
                      {order.status === 4 && (
                        <>
                          <option value="4">Hủy</option>
                        </>
                      )}
                    </select>
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/order-detail/${order._id}`}>
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default Order;
