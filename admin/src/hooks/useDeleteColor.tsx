"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useDeleteColor() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteColor = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa màu này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    setIsLoading(true);

    try {
      const url = `/api/delete-color/${id}`;
      await axios.delete(url);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteColor, isLoading };
}
