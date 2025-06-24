"use client";
import useGetOrderDetail from "@/hooks/useGetOrderDetail";
import Image from "./Image";
import { useParams } from "next/navigation";

function OrderDetail() {
  const params = useParams();
  const id = params.id as string;
  const orderdetail = useGetOrderDetail(id);
  return (
    <div className="w-full px-[15px] py-[30px]">
      <div className="w-full max-w-full border-[1.5px] border-double border-gray-300 lg:max-w-[750px] rounded-sm mx-auto">
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

              <span className="text-[0.95rem]">
                Mã: {orderdetail?.order.orderCode}
              </span>
              <span className="text-[0.95rem]">
                Ngày: {orderdetail?.order.createdAt}
              </span>
            </div>
          </div>

          <div className="mt-[30px]">
            <div className="flex flex-col py-[15px] px-[15px] sm:px-[20px] gap-[8px]">
              <h2 className="text-[1.15rem] font-semibold uppercase">
                Thông tin giao hàng
              </h2>

              <span className="text-[0.95rem]">
                Họ và tên: {orderdetail?.order.address.fullname}
              </span>
              <span className="text-[0.95rem]">
                Số điện thoại: {orderdetail?.order.address.phone}
              </span>
              <span className="text-[0.95rem]">
                Địa chỉ: {orderdetail?.order.address.speaddress}
                {", "}
                {orderdetail?.order.address.city}
                {", "}
                {orderdetail?.order.address.district}
                {", "}
                {orderdetail?.order.address.ward}
              </span>
              <span className="text-[0.95rem]">
                Phương thức thanh toán:{" "}
                {orderdetail?.order.paymethod === 1 ? "Chuyển khoản" : "COD"}
              </span>
            </div>

            <div className="w-full overflow-auto mb-[30px]">
              <table className="w-[200%] my-[15px] border-collapse text-[0.9rem] sm:w-full">
                <thead>
                  <tr className="font-medium text-left bg-[#F1F2F4]">
                    <th className="pl-[15px] sm:pl-[20px] py-[15px]">Tên</th>
                    <th className="p-[15px]">Giá</th>
                    <th className="p-[15px]">Số lượng</th>
                    <th className="p-[15px]">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orderdetail?.buy.map((item, index) => (
                    <tr key={index}>
                      <td className="pl-[15px] sm:pl-[20px] py-[15px]">
                        <div className="flex items-center gap-[10px]">
                          <Image
                            Src={item.product.image}
                            Alt={""}
                            ClassName={"w-[60px]"}
                            loadingType="eager"
                          />

                          <div>
                            <p>{item.product.name}</p>
                            <p>
                              {item.size.namesize} / {item.color.namecolor}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-[15px]">
                        {item.product.price.toLocaleString("vi-VN")}₫
                      </td>
                      <td className="p-[15px]">x{item.quantity}</td>
                      <td className="p-[15px]">
                        {item.subtotal.toLocaleString("vi-VN")}₫
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td className="pl-[15px] sm:pl-[20px] p-[15px]">
                      <hr className="border border-black" />
                    </td>
                  </tr>

                  {/*
       <tr className="text-[1rem]">
                    <td className="font-semibold p-[15px] pl-[15px] sm:pl-[20px]">
                      Thành tiền:
                    </td>
                    <td className="p-[15px]">580,000₫</td>
                  </tr>
                  */}

                  {/*
      <tr className="text-[1rem]">
                    <td className="font-semibold p-[15px] pl-[15px] sm:pl-[20px]">
                      Phí ship:
                    </td>
                    <td className="p-[15px]">20,000₫</td>
                  </tr>
  */}

                  <tr className="text-[1rem]">
                    <td className="font-semibold p-[15px]">Tổng cộng:</td>
                    <td className="p-[15px]">
                      {orderdetail?.order.total.toLocaleString("vi-VN")}₫
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
