"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";
import useGetCoupons from "@/hooks/useGetCoupons";
import { useAppSelector } from "@/redux/hook";
import useDeleteCoupon from "@/hooks/useDeleteCoupon";
import Loading from "./Loading";
import Image from "./Image";
function Coupon() {
  const { coupons, fetchCoupons } = useGetCoupons();
  const { deleteCoupon } = useDeleteCoupon(fetchCoupons);
  const loading = useAppSelector((state) => state.loadingSlice);

  const array = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Chưa hiệu lực",
      status: 0,
    },
    {
      name: "Đang hiệu lực",
      status: 1,
    },
    {
      name: "Hết lượt dùng",
      status: 2,
    },
      {
      name: "Hết hạn",
      status: 3,
    },
  ];
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Phiếu giảm giá ({coupons.length})
        </h1>

        <Link
          href={"/add-coupon"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="p-[6px_10px] border border-[#b0b0b0] inline-block text-[#666] outline-none text-[0.9rem]"
            />
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] text-left text-[#444] text-[0.9rem]">
                Mã giảm giá
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">
                Điều kiện sử dụng
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Giảm giá</th>

              <th className="text-left text-[#444] text-[0.9rem]">Số lượng</th>

              <th className="text-left text-[#444] text-[0.9rem]">Thời gian</th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu title="Tình trạng" array={array} />
              </th>
              <th className="p-[1rem_0] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading />
                </td>
              </tr>
            ) : coupons.length > 0 ? (
              coupons.map((coupon, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem] text-[#22BAA0] font-semibold uppercase">
                    {coupon.code}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {coupon.minOrderValue
                      ? `Đơn hàng phải ${coupon.minOrderValue.toLocaleString(
                          "vi-VN"
                        )}₫`
                      : "Không có"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {coupon.discountType === 2
                      ? `${coupon.discountValue.toLocaleString("vi-VN")}₫`
                      : coupon.discountType === 0
                      ? `${coupon.discountValue}%`
                      : "Miễn phí giao hàng"}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    Tối đa: {coupon.amount} / Đã dùng: 10
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(coupon.startDate as string).toLocaleDateString(
                      "vi-VN"
                    )}{" "}
                    {new Date(coupon.startDate as string).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                    {" - "}
                    {new Date(coupon.expiryDate as string).toLocaleDateString(
                      "vi-VN"
                    )}{" "}
                    {new Date(coupon.expiryDate as string).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {coupon.status === 0
                      ? "Chưa hiệu lực"
                      : coupon.status === 1
                      ? "Đang hiệu lực"
                      : coupon.status === 2
                      ? "Hết lượt dùng"
                      : "Hết hạn"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/edit-coupon/${coupon._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button onClick={() => deleteCoupon(coupon._id)}>
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[180px]"}
                      loadingType="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
}

export default Coupon;
