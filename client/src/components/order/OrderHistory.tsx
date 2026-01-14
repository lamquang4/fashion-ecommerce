"use client";
import Link from "next/link";
import Image from "../Image";
import useGetOrders from "@/hooks/useGetOrders";
import Loading from "../Loading";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../Pagination";
import { CiCalendar } from "react-icons/ci";

function OrderHistory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { orders, isLoading, totalPages, totalItems, currentPage } =
    useGetOrders();

  const array = [
    {
      status: "",
      name: "Tất cả",
    },
    {
      status: 0,
      name: "Chờ xác nhận",
    },
    {
      status: 1,
      name: "Xác nhận",
    },
    {
      status: 2,
      name: "Đang giao",
    },
    {
      status: 3,
      name: "Giao thành công",
    },
    {
      status: 4,
      name: "Đã hủy",
    },
  ];

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (!isNaN(Number(status))) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-full flex-1 sm:px-[15px] px-[10px]">
      <div className="flex justify-between items-center mb-[20px]">
        <h2>Đơn hàng</h2>

        <select
          onChange={handleStatusChange}
          value={searchParams.get("status") ?? ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block p-2 outline-0"
        >
          {array.map((item) => (
            <option value={item.status} key={item.status}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-5 flex-col">
        {isLoading ? (
          <Loading height={70} size={50} color="black" thickness={3} />
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div className="border border-gray-300 px-[15px]" key={order._id}>
              <div className="space-y-[10px] py-[15px] border-b border-gray-300">
                <div className="flex justify-between flex-wrap gap-[10px]">
                  <h5 className="font-semibold">Đơn hàng {order.orderCode}</h5>

                  <p
                    className={`font-medium ${
                      order.status === 0
                        ? "text-gray-500"
                        : order.status === 1
                        ? "text-gray-500"
                        : order.status === 2
                        ? "text-gray-500"
                        : order.status === 3
                        ? "text-green-600"
                        : order.status === 4
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {order.status === 0
                      ? "Chờ xác nhận"
                      : order.status === 1
                      ? "Xác nhận"
                      : order.status === 2
                      ? "Đang giao"
                      : order.status === 3
                      ? "Giao thành công"
                      : order.status === 4
                      ? "Hủy"
                      : ""}
                  </p>
                </div>

                <div className="text-gray-500 font-medium flex items-center gap-1">
                  <CiCalendar size={18} />{" "}
                  <span>
                    {new Date(order.createdAt).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {order.productsBuy.map((item, index) => (
                <div
                  key={index}
                  className="relative py-[15px] border-b border-gray-300 w-full"
                >
                  <Link href={`/order/${order.orderCode}`}>
                    <div className="flex items-center gap-[10px] w-full">
                      <div className="w-full max-w-[120px]">
                        <Image
                          Src={item.variant.images[0]}
                          Alt={item.product.name}
                          ClassName={"w-full object-cover"}
                          loadingType="lazy"
                        />
                      </div>

                      <div className="space-y-[15px]">
                        <h5 className="font-medium">{item.product.name}</h5>

                        <div className="flex gap-[10px] flex-wrap">
                          <span>x{item.quantity}</span>
                          <span>
                            {item.variant.size.namesize} /{" "}
                            {item.variant.color.namecolor}
                          </span>
                        </div>

                        <div className="flex gap-[10px] flex-wrap font-medium">
                          {item.discount > 0 ? (
                            <>
                              <del>{item.price.toLocaleString("vi-VN")}₫</del>
                              <span className="font-medium text-[#c00]">
                                {(item.price - item.discount).toLocaleString(
                                  "vi-VN"
                                )}
                                ₫
                              </span>
                            </>
                          ) : (
                            <span className="font-medium">
                              {item.price.toLocaleString("vi-VN")} ₫
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              <div className="py-[15px]">
                <div className="flex justify-between items-center flex-wrap gap-[10px]">
                  <h5 className="  font-medium">
                    Tổng cộng: {order.total.toLocaleString("vi-VN")}₫
                  </h5>

                  <Link
                    href={`/order/${order.orderCode}`}
                    className="text-white text-[0.9rem] font-medium px-[10px] py-[6px] bg-[#ee4d2d] hover:text-white"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-[70vh]">
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <Image
                Src={"/assets/other/empty-order.png"}
                Alt={""}
                ClassName={"w-[120px]"}
                loadingType="eager"
              />

              <h4 className="text-gray-600">Không có đơn hàng nào</h4>
            </div>
          </div>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}

export default OrderHistory;
