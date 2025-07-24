"use client";
import SideBarMenu from "./SideBarMenu";
import Image from "./Image";
import { useParams } from "next/navigation";
import useGetOrder from "@/hooks/useGetOrder";
import Loading from "./Loading";
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
  return (
    <section className="w-full mt-[40px] sm:mt-[45px]">
      <div className="px-[10px] flex justify-center flex-wrap sm:px-[15px]">
        <SideBarMenu />
        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          {isLoading ? (
            <Loading height={80} />
          ) : (
            <div className="py-[30px]">
              <div className="flex justify-between px-[15px] sm:px-[20px]">
                <div className="">
                  <Image
                    Src={"/assets/other/logo.png"}
                    Alt={""}
                    ClassName={"w-[80px]"}
                    loadingType="eager"
                  />
                </div>

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
              </div>

              <div className="mt-[30px]">
                <div className="flex flex-col py-[15px] px-[15px] sm:px-[20px] gap-[8px]">
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
                    Địa chỉ: {order?.speaddress}
                    {", "}
                    {order?.city}
                    {", "}
                    {order?.ward}
                  </span>
                  <span className="text-[0.95rem]">
                    Phương thức thanh toán:{" "}
                    {order?.paymethod === 1 ? "MoMo" : "COD"}
                  </span>
                </div>

                <div className="w-full overflow-auto mb-[30px]">
                  <table className="w-[200%] my-[15px] border-collapse text-[0.9rem] sm:w-full">
                    <thead>
                      <tr className="font-medium text-left bg-[#F1F2F4]">
                        <th className="pl-[15px] sm:pl-[20px] py-[15px]">
                          Tên
                        </th>
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
                              {item.discount > 0
                                ? (item.price - item.discount).toLocaleString(
                                    "vi-VN"
                                  )
                                : item.price.toLocaleString("vi-VN")}
                              ₫
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

                      <tr className="text-[1rem]">
                        <td className="font-semibold p-[15px]">
                          Phiếu giảm giá:
                        </td>
                        <td className="p-[15px]">
                          {order?.coupon?.discountType === 2 ? (
                            <p className=" text-gray-600">
                              -
                              {order?.coupon?.discountValue.toLocaleString(
                                "vi-VN"
                              )}
                              ₫
                            </p>
                          ) : order?.coupon?.discountType === 0 ? (
                            <p className=" text-gray-600">
                              -
                              {Math.min(
                                (totalPrice * order?.coupon?.discountValue) /
                                  100,
                                order?.coupon?.maxDiscountValue!
                              )}
                            </p>
                          ) : (
                            <p className=" text-gray-600">Miễn phí giao hàng</p>
                          )}
                        </td>
                      </tr>

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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderDetail;
