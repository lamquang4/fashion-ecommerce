"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function useUpdateStatusOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const updateStatusOrder = async (id: string, status: number) => {
    const result = await Swal.fire({
      title: `Xác nhận?`,
      text: `Bạn có chắc muốn thay đổi tình trạng đơn hàng này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) {
      return;
    }

    const loadingToast = toast.loading("Đang cập nhật...");

    setIsLoading(true);

    try {
      const url = `/api/orders/status/${id}`;
      await axios.put(url, {
        status: status,
      });
      toast.dismiss(loadingToast);
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { updateStatusOrder, isLoading };
}
