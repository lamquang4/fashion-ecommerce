"use client";
import SideBarMenu from "./SideBarMenu";
import Link from "next/link";
import Image from "./Image";
import useGetOrders from "@/hooks/useGetOrders";
import Loading from "./Loading";

function OrderHistory() {
  const { orders, isLoading } = useGetOrders();
  return (
    <section className="w-full mt-[40px] sm:mt-[45px]">
      <div className="flex justify-center flex-wrap px-[10px] sm:px-[15px]">
        <SideBarMenu />

        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          <div className="p-[25px_15px] sm:p-[30px_20px]">
            <h2 className="text-[1.5rem] font-semibold mb-[25px]">Đơn hàng</h2>

            <div className="flex gap-3.5 flex-col">
              {isLoading ? (
                <Loading height={70} />
              ) : orders.length > 0 ? (
                orders.map((order, index) => (
                  <div
                    className="border-[1.5px] border-double border-gray-300 p-[15px] pt-0"
                    key={index}
                  >
                    {order.productsBuy.map((item, index) => (
                      <div className="relative flex items-center py-[15px] border-b-[1.5px] border-b-double border-gray-300 gap-[10px]">
                        <div>
                          <Image
                            Src={item.variant.images[0]}
                            Alt={item.product.name}
                            ClassName={"max-w-[120px] round-[5px] object-cover"}
                            loadingType="eager"
                          />
                        </div>

                        <div>
                          <h2 className="text-[0.85rem] sm:text-[0.95rem] font-medium mb-[10px]">
                            {item.product.name}
                          </h2>
                          <div className="flex gap-[15px] items-center flex-wrap">
                            <div className="flex gap-[15px] text-[0.85rem] sm:text-[0.95rem]">
                              <span>x{item.quantity}</span>
                              <span>
                                {item.variant.size.namesize} /{" "}
                                {item.variant.color.namecolor}
                              </span>
                            </div>

                            <div className="">
                              <span>{item.price.toLocaleString("vi-VN")}₫</span>
                            </div>
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
                          className="text-[#3b82f6] text-[0.9rem] px-[10px] py-[6px] transition-[0.3s] border border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white"
                        >
                          Chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-[70vh]">
                  <div>
                    <div className="mb-[20px] flex justify-center">
                      <Image
                        Src={"/assets/other/empty-order.png"}
                        Alt={""}
                        ClassName={"w-[150px]"}
                        loadingType="eager"
                      />
                    </div>

                    <div className="flex justify-center flex-col gap-3 items-center text-center">
                      <h2 className="text-[1.2rem] font-semibold">
                        Không có đơn hàng nào
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderHistory;
