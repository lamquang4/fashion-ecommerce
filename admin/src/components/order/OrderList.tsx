"use client";

import { RiShoppingBag4Line } from "react-icons/ri";
import { RiTruckLine } from "react-icons/ri";
import { LuClock } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import useGetOrders from "@/hooks/useGetOrders";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import OrderTable from "./OrderTable";

function OrderList() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    orders,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
    totalStatus0,
    totalStatus3,
    totalStatus4,
  } = useGetOrders();

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
      <ListHeader title="Đơn hàng" totalItems={totalItems} arrayData={array1} />

      <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[15px] flex-wrap">
            <div className="relative flex gap-1.5 items-center">
              <label htmlFor="" className="text-[0.9rem]   font-medium">
                Từ:
              </label>
              <input
                required
                name="start"
                type="date"
                className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400  "
              />
            </div>

            <div className="relative flex gap-1.5 items-center">
              <label htmlFor="" className="text-[0.9rem]   font-medium">
                Đến:
              </label>
              <input
                required
                name="end"
                type="date"
                className="bg-gray-50 border border-gray-300 text-[0.9rem] p-[6px_10px] outline-none focus:border-gray-400  "
              />
            </div>

            <button className="p-[6px_10px] text-[0.9rem] bg-primary text-white">
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <OrderTable orders={orders} isLoading={isLoading} mutate={mutate} />
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default OrderList;
