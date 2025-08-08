"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useVisibleBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const visibleBanner = async (id: string, status: number) => {
    const action = status === 1 ? "hiện" : "ẩn";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Bạn có chắc muốn ${action} banner này không?`,
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
      const url = `/api/visible-banner/${id}`;
      await axios.put(url, {
        status: status,
      });
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { visibleBanner, isLoading };
}
