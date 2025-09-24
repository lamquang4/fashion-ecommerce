"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function useDeleteCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteCoupon = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa phiếu giảm giá này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    const loadingToast = toast.loading("Đang xóa...");

    setIsLoading(true);

    try {
      const url = `/api/coupons/${id}`;
      await axios.delete(url);
      toast.dismiss(loadingToast);
      toast.success("Xóa thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { deleteCoupon, isLoading };
}
