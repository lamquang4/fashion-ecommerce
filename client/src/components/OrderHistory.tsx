"use client";
import SideBarMenu from "./SideBarMenu";
import Link from "next/link";
import Image from "./Image";
import useGetOrders from "@/hooks/useGetOrders";
import Loading from "./Loading";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

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
    params.set("page", "1");

    if (!isNaN(Number(status))) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <section className="w-full mt-[40px] sm:mt-[45px]">
      <div className="flex justify-center flex-wrap">
        <SideBarMenu />

        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          <div className="p-[25px_15px]">
            <div className="flex justify-between items-center mb-[25px]">
              <h2 className="text-[1.5rem] font-semibold">Đơn hàng</h2>

              <select
                onChange={handleStatusChange}
                value={searchParams.get("status") ?? ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block p-2 outline-0"
              >
                {array.map((item, index) => (
                  <option value={item.status} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4.5 flex-col">
              {isLoading ? (
                <Loading height={70} size={50} color="black" thickness={2} />
              ) : orders.length > 0 ? (
                orders.map((order, index) => (
                  <div
                    className="border border-gray-300 p-[12px] flex gap-[10px] flex-col"
                    key={index}
                  >
                    {order.productsBuy.map((item, index) => (
                      <div
                        key={index}
                        className="relative flex items-center pb-[12px] border-b border-gray-300 gap-[10px]"
                      >
                        <Link href={`/order-detail/${order.orderCode}`}>
                          <Image
                            Src={item.variant.images[0]}
                            Alt={item.product.name}
                            ClassName={"max-w-[120px] round-[5px] object-cover"}
                            loadingType="eager"
                          />
                        </Link>

                        <div className="flex flex-col gap-[10px]">
                          <h2 className="text-[0.9rem] font-medium">
                            {item.product.name}
                          </h2>

                          <div className="flex gap-[12px] text-[0.9rem] flex-wrap">
                            <span>x{item.quantity}</span>
                            <span>
                              {item.variant.size.namesize} /{" "}
                              {item.variant.color.namecolor}
                            </span>
                          </div>

                          <div className="flex gap-[12px] flex-wrap">
                            {item.discount > 0 && (
                              <del>{item.price.toLocaleString("vi-VN")}₫</del>
                            )}
                            <span>
                              {item.discount > 0
                                ? (item.price - item.discount).toLocaleString(
                                    "vi-VN"
                                  )
                                : item.price.toLocaleString("vi-VN")}
                              ₫
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div>
                      <p
                        className={`mt-[15px] text-[0.95rem] font-medium ${
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

                      <div className="flex justify-between items-center mt-[15px]">
                        <span className="text-black text-[1rem] font-medium">
                          Tổng cộng: {order.total.toLocaleString("vi-VN")}₫
                        </span>

                        <Link
                          href={`/order-detail/${order.orderCode}`}
                          className="text-white text-[0.9rem] font-medium px-[10px] py-[6px] transition-[0.3s] bg-[#ee4d2d] hover:text-white"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-[70vh]">
                  <div>
                    <div className="mb-[15px] flex justify-center">
                      <Image
                        Src={"/assets/other/empty-order.png"}
                        Alt={""}
                        ClassName={"w-[120px]"}
                        loadingType="eager"
                      />
                    </div>

                    <div className="flex justify-center flex-col gap-3 items-center text-center">
                      <h2 className="text-[1.1rem] font-medium">
                        Không có đơn hàng nào
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderHistory;
