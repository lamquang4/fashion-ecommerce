"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteUser = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa người dùng này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    setIsLoading(true);

    try {
      const url = `/api/delete-user/${id}`;
      await axios.delete(url);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteUser, isLoading };
}
