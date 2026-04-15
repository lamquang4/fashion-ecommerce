"use client";
import Link from "next/link";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { RiShoppingBag4Line } from "react-icons/ri";
import { RiTruckLine } from "react-icons/ri";
import { LuClock } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import Image from "../ui/Image";
import Pagination from "../ui/Pagination";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import InputSearch from "../ui/InputSearch";
import useGetOrders from "@/hooks/useGetOrders";
import useUpdateStatusOrder from "@/hooks/useUpdateStatusOrder";
import Loading from "../ui/Loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";

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

  const { updateStatusOrder, isLoading: isLoadingUpdateStatusOrder } =
    useUpdateStatusOrder();

  const handleUpdateStatus = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }
    await updateStatusOrder(id, status);
    mutate();
  };

  const array = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Chờ thanh toán",
      value: -1,
    },
    {
      name: "Chờ xác nhận",
      value: 0,
    },
    {
      name: "Xác nhận",
      value: 1,
    },
    {
      name: "Đang giao",
      value: 2,
    },
    {
      name: "Giao thành công",
      value: 3,
    },
    {
      name: "Đã hủy",
      value: 4,
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

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Mã đơn</th>

              <th className="p-[1rem]  ">Khách hàng</th>
              <th className="p-[1rem]  ">Thanh toán</th>

              <th className="p-[1rem]  ">Tổng tiền</th>
              <th className="p-[1rem]  ">Ngày tạo</th>
              <th className="p-[1rem]   relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>
              <th className="p-[1rem]  ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem] text-[#22BAA0] font-semibold text-[0.9rem]">
                    {order.orderCode}
                  </td>
                  <td className="p-[1rem]  ">{order.fullname}</td>
                  <td className="p-[1rem]  ">{order.paymethod}</td>
                  <td className="p-[1rem]  ">
                    {order.total!.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="p-[1rem]">
                    {new Date(order.createdAt).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="p-[1rem]">
                    <select
                      disabled={isLoadingUpdateStatusOrder}
                      name="status"
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order._id, parseInt(e.target.value))
                      }
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400  "
                    >
                      {order.status === -1 && (
                        <option value="-1">Chờ thanh toán</option>
                      )}
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
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/order/${order._id}`}>
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
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/assets/other/notfound1.png"}
                      alt={""}
                      className={"w-[135px]"}
                      loading="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
