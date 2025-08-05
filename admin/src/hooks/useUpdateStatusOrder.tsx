"use client";
import axios from "axios";
import { useState } from "react";
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

    if (!result.isConfirmed) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.put(`/api/update-status-order/${id}`, {
        status: status,
      });
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatusOrder, isLoading };
}
