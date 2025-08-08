"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useVisibleCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const visibleCategory = async (id: string, status: number) => {
    const action = status === 1 ? "hiện" : "ẩn";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Bạn có chắc muốn ${action} danh mục này không?`,
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
      const url = `/api/visible-category/${id}`;
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

  return { visibleCategory, isLoading };
}
