"use client";
import SideBarMenu from "./SideBarMenu";
import Image from "./Image";
import { useParams } from "next/navigation";
import useGetOrder from "@/hooks/useGetOrder";
import Loading from "./Loading";
import { LuArchive, LuCheck, LuStar, LuTruck } from "react-icons/lu";
import { RiArrowLeftSLine } from "react-icons/ri";
import { TbCancel } from "react-icons/tb";
import Link from "next/link";
function OrderDetail() {
  const params = useParams();
  const code = params.code as string;
  const { order, isLoading } = useGetOrder(code);

  const totalPrice =
    order?.productsBuy.reduce((sum, item) => {
      const finalPrice =
        item.discount > 0 ? item.price - item.discount : item.price;

      return sum + finalPrice * item.quantity;
    }, 0) || 0;

  const steps = [
    { label: "Đơn đã đặt", icon: <LuArchive size={24} /> },
    { label: "Đã xác nhận", icon: <LuCheck size={24} /> },
    { label: "Đang giao", icon: <LuTruck size={24} /> },
    { label: "Đơn hoàn thành", icon: <LuStar size={24} /> },
  ];

  return (
    <section className="w-full mt-[40px] sm:mt-[45px]">
      <div className="flex justify-center flex-wrap">
        <SideBarMenu />
        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          {isLoading ? (
            <Loading height={70} size={50} color="black" thickness={3} />
          ) : (
            <div>
              <div className="flex justify-between px-[15px] sm:px-[20px] py-[30px] border-b border-gray-300">
                <div className="flex flex-col gap-[8px]">
                  <h2 className="uppercase text-[1.15rem] font-semibold">
                    Đơn hàng
                  </h2>

                  <span className="text-[0.95rem]">Mã: {order?.orderCode}</span>
                  <span className="text-[0.95rem]">
                    Ngày:{" "}
                    {order?.createdAt && (
                      <>
                        {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        {new Date(order.createdAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    )}
                  </span>
                </div>

                <Link href={"/order"} className="text-center">
                  <span className="flex items-center font-semibold text-[0.95rem] text-gray-500">
                    <RiArrowLeftSLine size={20} /> Trở về
                  </span>
                </Link>
              </div>

              {order?.status !== 4 ? (
                <div className="relative gap-y-5 grid grid-cols-2 md:grid-cols-4 py-[30px] px-[15px] sm:px-[20px] border-b border-gray-300">
                  {steps.map((step, index) => {
                    const isActive = order?.status! >= index;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center relative z-10 bg-white"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${
                            isActive
                              ? "border-green-500 text-green-500"
                              : "border-gray-400 text-gray-400"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <span
                          className={`text-[0.85rem] font-medium text-center ${
                            isActive ? " text-green-500" : "text-black"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative flex items-center justify-center py-[30px] px-[15px] sm:px-[20px] border-b border-gray-300">
                  <span className="text-[0.95rem] font-semibold text-center text-red-500 flex items-center gap-2">
                    <TbCancel size={25} /> Đã hủy đơn hàng
                  </span>
                </div>
              )}

              <div className="flex flex-col px-[15px] sm:px-[20px] gap-[8px] py-[30px]">
                <h2 className="text-[1.15rem] font-semibold uppercase">
                  Thông tin giao hàng
                </h2>

                <span className="text-[0.95rem]">
                  Họ và tên: {order?.fullname}
                </span>
                <span className="text-[0.95rem]">
                  Số điện thoại: {order?.phone}
                </span>
                <span className="text-[0.95rem]">
                  Địa chỉ: {order?.speaddress + ", "}
                  {order?.city + ", "}
                  {order?.ward + ", "}
                </span>
                <span className="text-[0.95rem]">
                  Phương thức thanh toán:{" "}
                  {order?.paymethod === 1 ? "Momo" : "COD"}
                </span>
              </div>

              <div className="w-full overflow-auto pb-[30px]">
                <table className="w-[200%] border-collapse text-[0.9rem] sm:w-full">
                  <thead>
                    <tr className="font-medium text-left bg-[#F1F2F4]">
                      <th className="pl-[15px] sm:pl-[20px] py-[15px]">Tên</th>
                      <th className="p-[15px]">Giá</th>
                      <th className="p-[15px]">Số lượng</th>
                      <th className="p-[15px]">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.productsBuy.map((item, index) => (
                      <tr key={index}>
                        <td className="pl-[15px] sm:pl-[20px] py-[15px]">
                          <div className="flex items-center gap-[10px]">
                            <Image
                              Src={item.variant.images[0]}
                              Alt={""}
                              ClassName={"w-[60px]"}
                              loadingType="eager"
                            />

                            <div>
                              <p>{item.product.name}</p>
                              <p>
                                {item.variant.size.namesize} /{" "}
                                {item.variant.color.namecolor}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-[15px]">
                          <div className="flex gap-2.5">
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
                        </td>
                        <td className="p-[15px]">x{item.quantity}</td>
                        <td className="p-[15px]">
                          {item.discount > 0
                            ? (
                                (item.price - item.discount) *
                                item.quantity
                              ).toLocaleString("vi-VN")
                            : (item.price * item.quantity).toLocaleString(
                                "vi-VN"
                              )}
                          ₫
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td className="pl-[15px] sm:pl-[20px] p-[15px]">
                        <hr className="border border-black" />
                      </td>
                    </tr>

                    <tr className="text-[1rem]">
                      <td className="font-semibold p-[15px]">Tổng:</td>
                      <td className="p-[15px]">
                        {totalPrice.toLocaleString("vi-VN")}₫
                      </td>
                    </tr>

                    {order?.coupon && (
                      <tr className="text-[1rem]">
                        <td className="font-semibold p-[15px]">
                          Phiếu giảm giá:
                        </td>
                        <td className="p-[15px]">
                          {order?.coupon?.discountType === 1 ? (
                            <p className=" text-black">
                              -
                              {order?.coupon?.discountValue.toLocaleString(
                                "vi-VN"
                              )}
                              ₫
                            </p>
                          ) : order?.coupon?.discountType === 0 ? (
                            <p className=" text-black">
                              -
                              {Math.min(
                                (totalPrice * order?.coupon?.discountValue) /
                                  100,
                                order?.coupon?.maxDiscountValue!
                              )}
                            </p>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    )}

                    <tr className="text-[1rem]">
                      <td className="font-semibold p-[15px]">Tổng cộng:</td>
                      <td className="p-[15px]">
                        {order?.total.toLocaleString("vi-VN")}₫
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderDetail;
