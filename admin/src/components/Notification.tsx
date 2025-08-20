import useGetNotifyOrders from "@/hooks/useGetNotifyOrders";
import React, { memo } from "react";
import { LiaBell } from "react-icons/lia";
type menuProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};
function Notification({ menuOpen, toggleMenu }: menuProps) {
  const { orders } = useGetNotifyOrders();
  return (
    <div
      className="flex cursor-pointer items-center gap-[6px] text-[0.9rem] relative"
      onMouseOver={toggleMenu}
      onMouseOut={toggleMenu}
    >
      <button className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 justify-center items-center flex relative">
        <LiaBell size={21} />
      </button>

      {menuOpen && (
        <div className="w-[200px] absolute top-full right-[-40px] overflow-hidden z-20 duration-400 ease-in-out bg-white shadow-md rounded-md border border-gray-200  ">
          <div className="sticky top-0 px-2 py-2.5 border-b border-gray-300">
            <h2 className="text-[0.95rem] font-semibold text-center">
              Thông báo
            </h2>
          </div>
          <div className="h-full max-h-[400px] overflow-y-auto custom-scroll">
            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <div
                    className="flex flex-col gap-1.5 px-2 py-2.5"
                    key={order._id}
                  >
                    <span className="text-[0.9rem]">
                      Khách hàng{" "}
                      <span className="font-semibold">{order.fullname}</span> đã
                      đặt hàng, mã đơn là {order.orderCode}
                    </span>

                    <p className="text-[#22BAA0] text-[0.8rem] font-medium text-right">
                      Hôm nay{" "}
                      {new Date(order.createdAt as string).toLocaleString(
                        "vi-VN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="px-2 py-2.5 text-center">
                <span className="font-medium text-[0.9rem] text-gray-500">
                  Không có thông báo
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Notification);
