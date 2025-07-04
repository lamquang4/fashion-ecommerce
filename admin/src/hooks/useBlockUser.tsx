"use client";
import axios from "axios";
import Swal from "sweetalert2";

export default function useBlockUser() {
  const blockUser = async (id: string, status: number) => {
    const action = status === 1 ? "chặn" : "bỏ chặn";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Bạn có chắc muốn ${action} người dùng này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) {
      return;
    }
    try {
      const res = await axios.put("/api/block-user", {
        id: id,
        status: status,
      });
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { blockUser };
}
