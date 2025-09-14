import useGetNotifyOrders from "@/hooks/useGetNotifyOrders";
import   { memo } from "react";
import { LiaBell } from "react-icons/lia";
type Props = {
  menuOpen: boolean;
  toggleMenu: () => void;
};
function Notification({ menuOpen, toggleMenu }: Props) {
  const { orders } = useGetNotifyOrders();
  return (
    <div
      className="flex cursor-pointer items-center gap-[6px] text-[0.9rem] relative"
      onMouseOver={toggleMenu}
      onMouseOut={toggleMenu}
    >
      <button className="w-8.5 h-8.5 rounded-lg border border-gray-200 justify-center items-center flex relative">
        <LiaBell size={20} />
        <small className="absolute top-[-9px] right-[-9px] z-1 h-5 w-5 rounded-full font-medium bg-[#0AB39C] flex items-center justify-center text-white text-[0.7rem]">
          {orders.length}
        </small>
      </button>

      {menuOpen && (
        <div className="w-[200px] absolute top-full right-[-40px] overflow-hidden z-20 duration-400 ease-in-out bg-white shadow-md rounded-md border border-gray-200  ">
          <div className="sticky top-0 px-2 py-2.5 border-b border-gray-300">
            <p className="font-semibold text-center">Thông báo</p>
          </div>
          <div className="h-full max-h-[400px] overflow-y-auto custom-scroll">
            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <div
                    className="flex flex-col gap-1.5 px-2 py-2.5"
                    key={order._id}
                  >
                    <span>
                      Khách hàng{" "}
                      <span className="font-medium">{order.fullname}</span> đã
                      đặt hàng, mã đơn là {order.orderCode}
                    </span>

                    <small className="text-[#22BAA0] text-[0.75rem] font-medium text-right">
                      Hôm nay{" "}
                      {new Date(order.createdAt as string).toLocaleString(
                        "vi-VN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </small>
                  </div>
                );
              })
            ) : (
              <div className="px-2 py-2.5 text-center">
                <span className="font-medium">Không có thông báo</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Notification);
