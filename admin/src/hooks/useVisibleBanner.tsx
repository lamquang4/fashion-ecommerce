"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
export interface Banner {
  _id: string;
  image?: string;
  status: number;
  createdAt?: string;
}

export default function useVisibleBanner(fetchBanners: () => void) {
  const dispatch = useAppDispatch();
  const visibleBanner = async (data: Banner) => {
    const action = data.status === 1 ? "hiện" : "ẩn";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Bạn có chắc muốn ${action} banner này không?`,
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
      const res = await axios.put("/api/visible-banner", {
        id: data._id,
        status: data.status,
      });
      fetchBanners();
      return res.data.banner;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { visibleBanner };
}
