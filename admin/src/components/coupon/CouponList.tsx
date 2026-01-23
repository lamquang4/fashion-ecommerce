"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import Pagination from "../Pagination";
import FilterDropDownMenu from "../FilterDropDownMenu";
import useGetCoupons from "@/hooks/useGetCoupons";
import useDeleteCoupon from "@/hooks/useDeleteCoupon";
import Loading from "../Loading";
import Image from "../Image";
import InputSearch from "../InputSearch";
import toast from "react-hot-toast";
import ListHeader from "../list/ListHeader";
import ListBody from "../list/ListBody";
function CouponList() {
  const {
    coupons,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetCoupons();
  const { deleteCoupon, isLoading: isLoadingDeleteCoupon } = useDeleteCoupon();

  const array = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Chưa hiệu lực",
      value: 0,
    },
    {
      name: "Đang hiệu lực",
      value: 1,
    },
    {
      name: "Hết lượt dùng",
      value: 2,
    },
    {
      name: "Hết hạn",
      value: 3,
    },
  ];

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteCoupon(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };
  return (
    <>
      <ListHeader
        title="Phiếu giảm giá"
        totalItems={totalItems}
        addLink="/add-coupon"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Mã giảm giá</th>
              <th className="p-[1rem]  ">Điều kiện sử dụng</th>
              <th className="p-[1rem]  ">Giảm giá</th>

              <th className="p-[1rem]  ">Số lượng</th>

              <th className="p-[1rem]  ">Thời gian</th>

              <th className="p-[1rem]  ">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>

              <th className="p-[1rem]  ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem] text-[0.9rem] text-[#22BAA0] font-semibold uppercase">
                    {coupon.code}
                  </td>
                  <td className="p-[1rem]  ">
                    {coupon.minOrderValue
                      ? `Đơn hàng phải từ ${coupon.minOrderValue.toLocaleString(
                          "vi-VN",
                        )}₫ trở lên`
                      : "Mọi đơn hàng"}
                    {coupon.discountType === 0 &&
                      coupon.maxDiscountValue &&
                      `, giảm tối đa ${coupon.maxDiscountValue.toLocaleString(
                        "vi-VN",
                      )}₫`}
                  </td>
                  <td className="p-[1rem]  ">
                    {coupon.discountType === 1
                      ? `${coupon.discountValue.toLocaleString("vi-VN")}₫`
                      : coupon.discountType === 0
                        ? `${coupon.discountValue}%`
                        : ""}
                  </td>

                  <td className="p-[1rem]  ">Tối đa: {coupon.amount}</td>

                  <td className="p-[1rem]  ">
                    {new Date(coupon.startDate).toLocaleDateString("vi-VN")}{" "}
                    {new Date(coupon.startDate).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {new Date(coupon.expiryDate).toLocaleDateString(
                      "vi-VN",
                    )}{" "}
                    {new Date(coupon.expiryDate).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-[1rem]  ">
                    {coupon.status === 0
                      ? "Chưa hiệu lực"
                      : coupon.status === 1
                        ? "Đang hiệu lực"
                        : coupon.status === 2
                          ? "Hết lượt dùng"
                          : "Hết hạn"}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <Link href={`/edit-coupon/${coupon._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button
                        disabled={isLoadingDeleteCoupon}
                        onClick={() => handleDelete(coupon._id || "")}
                      >
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[135px]"}
                      loadingType="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default CouponList;
