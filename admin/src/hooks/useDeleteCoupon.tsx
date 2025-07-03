"use client";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeleteCoupon() {
  const deleteCoupon = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa phiếu giảm giá này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    try {
     await axios.delete(`/api/delete-coupon/${id}`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } 
  };

  return { deleteCoupon };
}
