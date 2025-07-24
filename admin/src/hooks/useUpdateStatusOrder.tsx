"use client";
import axios from "axios";
import Swal from "sweetalert2";

export default function useUpdateStatusOrder() {
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
    try {
      const res = await axios.put(`/api/update-status-order/${id}`, {
        status: status,
      });
      return res.data.banner;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateStatusOrder };
}
