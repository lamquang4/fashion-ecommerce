"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useDeleteCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteCategory = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa danh mục này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    setIsLoading(true);

    try {
      await axios.delete(`/api/delete-category/${id}`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCategory, isLoading };
}
