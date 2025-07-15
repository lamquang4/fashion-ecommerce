"use client";
import SideBarMenu from "./SideBarMenu";
import Image from "./Image";
function OrderDetail() {
  return (
    <section className="w-full mt-[40px] sm:mt-[45px]">
      <div className="px-[10px] flex justify-center flex-wrap sm:px-[15px]">
        <SideBarMenu />
        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          <div className="py-[30px]">
            <div className="flex justify-between px-[15px] sm:px-[20px]">
              <div>
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

                <span className="text-[0.95rem]">Mã: OD5048</span>
                <span className="text-[0.95rem]">Ngày: 21/03/2025</span>
              </div>
            </div>

            <div className="mt-[30px]">
              <div className="flex flex-col py-[15px] px-[15px] sm:px-[20px] gap-[8px]">
                <h2 className="text-[1.15rem] font-semibold uppercase">
                  Thông tin giao hàng
                </h2>

                <span className="text-[0.95rem]">Họ và tên: Quang Lam</span>
                <span className="text-[0.95rem]">
                  Số điện thoại: 0984845xxx
                </span>
                <span className="text-[0.95rem]">
                  Địa chỉ: ABC, HWWWXYZ, Quận 6, Phường 6
                </span>
                <span className="text-[0.95rem]">
                  Phương thức thanh toán: cod
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
                    <tr>
                      <td className="pl-[15px] sm:pl-[20px] py-[15px]">
                        <div className="flex items-center gap-[10px]">
                          <Image
                            Src={"/assets/products/IMGSP3483.png"}
                            Alt={""}
                            ClassName={"w-[60px]"}
                            loadingType="eager"
                          />

                          <div>
                            <p>Jack Hydrangea Melange Shirt</p>
                            <p>M / Đen</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-[15px]">290,000₫</td>
                      <td className="p-[15px]">x1</td>
                      <td className="p-[15px]">290,000₫</td>
                    </tr>
                    <tr>
                      <td className="pl-[15px] sm:pl-[20px] py-[15px]">
                        <div className="flex items-center gap-[10px]">
                          <Image
                            Src={"/assets/products/IMGSP3483.png"}
                            Alt={""}
                            ClassName={"w-[60px]"}
                            loadingType="eager"
                          />

                          <div>
                            <p>Jack Hydrangea Melange Shirt</p>
                            <p>S / Đen</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-[15px]">290,000₫</td>
                      <td className="p-[15px]">x1</td>
                      <td className="p-[15px]">290,000₫</td>
                    </tr>
                    <tr>
                      <td className="pl-[15px] sm:pl-[20px] p-[15px]">
                        <hr className="border border-black" />
                      </td>
                    </tr>
                    <tr className="text-[1rem]">
                      <td className="font-semibold p-[15px] pl-[15px] sm:pl-[20px]">
                        Thành tiền:
                      </td>
                      <td className="p-[15px]">580,000₫</td>
                    </tr>

                    <tr className="text-[1rem]">
                      <td className="font-semibold p-[15px] pl-[15px] sm:pl-[20px]">
                        Phí ship:
                      </td>
                      <td className="p-[15px]">20,000₫</td>
                    </tr>

                    <tr className="text-[1rem]">
                      <td className="font-semibold p-[15px]">Tổng cộng:</td>
                      <td className="p-[15px]">600,000₫</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetail;
