"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useDeleteBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteBanner = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa banner này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    setIsLoading(true);

    try {
      const url = `/api/delete-banner/${id}`;
      await axios.delete(url);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteBanner, isLoading };
}
