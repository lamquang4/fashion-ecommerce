"use client";
import axios from "axios";
import Swal from "sweetalert2";

export default function useVisibleCategory() {
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
    try {
      const res = await axios.put(`/api/visible-category/${id}`, {
        status: status,
      });
      return res.data.category;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { visibleCategory };
}
