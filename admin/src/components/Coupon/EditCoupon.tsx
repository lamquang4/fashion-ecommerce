"use client";
import useGetCoupon from "@/hooks/useGetCoupon";
import useUpdateCoupon from "@/hooks/useUpdateCoupon";
import { formatDate } from "@/utils/formatDate";
import { validateNonNegativeNumber } from "@/utils/validateNonNegativeNumber";
import { validatePercentNumber } from "@/utils/validatePercentNumber";
import { validatePositiveNumber } from "@/utils/validatePositiveNumber";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditCoupon() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState({
    code: "",
    limit: 1,
    amount: 1,
    discountType: "",
    discountValue: 1,
    startDate: "",
    expiryDate: "",
    minOrderValue: 0,
    maxDiscountValue: 1,
  });

  const { coupon, mutate, isLoading } = useGetCoupon(id);
  const { updateCoupon, isLoading: isLoadingUpdateCoupon } =
    useUpdateCoupon(id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isLoading) return;

    if (!coupon) {
      toast.error("Không tìm thấy phiếu giảm giá");
      router.push("/coupon");
      return;
    }
  }, [coupon, isLoading, router]);

  useEffect(() => {
    if (coupon) {
      setData({
        code: coupon.code,
        limit: coupon.limit,
        amount: coupon.amount,
        discountType: String(coupon.discountType),
        discountValue: coupon.discountValue || 1,
        startDate: formatDate(coupon.startDate),
        expiryDate: formatDate(coupon.expiryDate),
        minOrderValue: coupon.minOrderValue,
        maxDiscountValue: coupon.maxDiscountValue || 1,
      });
    }
  }, [coupon]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(data.startDate);
    const expiry = new Date(data.expiryDate);
    const now = new Date();

    if (coupon?.status === 3) {
      toast.error("Phiếu giảm giá đã hết hạn nên không được cập nhật!");
      mutate(undefined, true);
      return;
    }

    if (start < now && coupon?.status != 1) {
      toast.error("Ngày bắt đầu không được sau ngày hiện tại");
      mutate(undefined, true);
      return;
    }

    if (start >= expiry && coupon?.status != 1) {
      toast.error("Ngày kết thúc phải sau ngày bắt đầu");
      mutate(undefined, true);
      return;
    }

    if (data.amount < data.limit) {
      toast.error("Số lượng phát hành phải lớn hơn số lần dùng");
      mutate(undefined, true);
      return;
    }

    if (!validatePositiveNumber(data.amount)) {
      toast.error("Số lượng phải lớn hơn 0");
      mutate(undefined, true);
      return;
    }

    if (!validatePositiveNumber(data.limit)) {
      toast.error("Số lần dùng phải lớn hơn 0");
      mutate(undefined, true);
      return;
    }

    if (data.discountType === "2") {
      if (!validatePositiveNumber(data.discountValue)) {
        toast.error("Giá trị cố định giảm giá phải lớn hơn 0");
        mutate(undefined, true);
        return;
      }
    }

    if (data.discountType === "0") {
      if (!validatePercentNumber(data.discountValue)) {
        toast.error("Giá trị % giảm giá từ 1 đến 100");
        mutate(undefined, true);
        return;
      }
    }

    if (!validateNonNegativeNumber(data.minOrderValue)) {
      toast.error(
        "Giá trị tiền cố định đơn hàng tối thiểu phải lớn hơn hoặc bằng 0"
      );
      mutate(undefined, true);
      return;
    }

    if (data.discountType === "0") {
      if (!validatePositiveNumber(Number(data.maxDiscountValue))) {
        toast.error(
          "Giá trị tiền cố định giảm tối đa (chỉ áp dụng loại phiếu %) phải lớn hơn 0"
        );
        mutate(undefined, true);
        return;
      }
    }

    try {
      await updateCoupon({
        code: data.code.toUpperCase().trim(),
        limit: data.limit,
        amount: data.amount,
        discountType: parseInt(data.discountType),
        discountValue: data.discountValue,
        startDate: new Date(data.startDate),
        expiryDate: new Date(data.expiryDate),
        minOrderValue: data.minOrderValue,
        maxDiscountValue: data.maxDiscountValue,
      });

      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h2 className="text-[#74767d]">Chỉnh sửa phiếu giảm giá</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
            <h5 className="font-bold text-[#74767d]">Thông tin chung</h5>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem]  font-medium">
                Mã giảm giá
              </label>
              <input
                type="text"
                name="code"
                value={data.code}
                onChange={handleChange}
                maxLength={12}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400   uppercase"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-[0.9rem]  font-medium">
                    Số lượng phát hành
                  </label>
                  <input
                    type="number"
                    name="amount"
                    inputMode="numeric"
                    value={data.amount}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-[0.9rem]  font-medium">
                    Số lần dùng
                  </label>
                  <input
                    type="number"
                    name="limit"
                    inputMode="numeric"
                    value={data.limit}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem]  font-medium">
                Loại giảm giá
              </label>
              <select
                name="discountType"
                value={data.discountType}
                disabled={coupon?.status === 1}
                onChange={handleChange}
                required
                className={`border border-gray-300  p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400   w-full ${
                  coupon?.status === 1 ? "cursor-not-allowed" : ""
                }`}
              >
                <option value="0">Phần trăm %</option>
                <option value="1">Số tiền cố định</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem]  font-medium">
                {`Giá trị ${
                  data.discountType === "0"
                    ? "phần trăm"
                    : data.discountType === "1"
                    ? "tiền cố định"
                    : ""
                } giảm giá `}
              </label>
              <input
                type="number"
                name="discountValue"
                inputMode="numeric"
                value={data.discountValue}
                disabled={coupon?.status === 1}
                onChange={handleChange}
                required
                className={`border border-gray-300  p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400   w-full ${
                  coupon?.status === 1 ? "cursor-not-allowed" : ""
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem]  font-medium">
                Giá trị tối thiểu của đơn hàng để áp dụng phiếu (0 để áp dụng
                cho mọi đơn hàng)
              </label>
              <input
                type="number"
                name="minOrderValue"
                inputMode="numeric"
                value={data.minOrderValue}
                disabled={coupon?.status === 1}
                onChange={handleChange}
                required
                className={`border border-gray-300  p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400   w-full ${
                  coupon?.status === 1 ? "cursor-not-allowed" : ""
                }`}
              />
            </div>

            {data.discountType === "0" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem]  font-medium">
                  Giá trị tiền cố định giảm tối đa (chỉ áp dụng loại phiếu %)
                </label>
                <input
                  type="number"
                  name="maxDiscountValue"
                  inputMode="numeric"
                  value={data.maxDiscountValue}
                  disabled={coupon?.status === 1}
                  onChange={handleChange}
                  required
                  className={`border border-gray-300  p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400   w-full ${
                    coupon?.status === 1 ? "cursor-not-allowed" : ""
                  }`}
                />
              </div>
            )}

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem]  font-medium">
                  Ngày bắt đầu
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={data.startDate}
                  disabled={coupon?.status === 1}
                  onChange={handleChange}
                  required
                  className={`border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400   w-full ${
                    coupon?.status === 1 ? "cursor-not-allowed" : ""
                  }`}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem]  font-medium">
                  Ngày kết thúc
                </label>
                <input
                  type="datetime-local"
                  name="expiryDate"
                  value={data.expiryDate}
                  disabled={coupon?.status === 1}
                  onChange={handleChange}
                  required
                  className={`border border-gray-300  p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400   w-full ${
                    coupon?.status === 1 ? "cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            disabled={isLoadingUpdateCoupon}
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
          >
            {isLoadingUpdateCoupon ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <Link
            href="/coupon"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditCoupon;
