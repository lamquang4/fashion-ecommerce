"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
export interface User {
  _id: string;
  fullname?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  password?: string;
  role?: number;
  status: number;
  createdAt?: string;
}

export default function useBlockUser() {
  const dispatch = useAppDispatch();
  const blockUser = async (data: User) => {
    const action = data.status === 1 ? "chặn" : "bỏ chặn";
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
      dispatch(setLoading(true));
      const res = await axios.put("/api/block-user", {
        id: data._id,
        status: data.status,
      });
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { blockUser };
}
