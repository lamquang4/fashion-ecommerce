"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
export interface Category {
  _id: string;
  namecategory?: string;
  gender?: number;
  image?: string;
  slug?: string;
  status: number;
  createdAt?: string;
}

export default function useVisibleCategory() {
  const dispatch = useAppDispatch();
  const visibleCategory = async (data: Category) => {
    const action = data.status === 1 ? "hiện" : "ẩn";
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
      dispatch(setLoading(true));
      const res = await axios.put("/api/visible-category", {
        id: data._id,
        status: data.status,
      });
      return res.data.category;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { visibleCategory };
}
