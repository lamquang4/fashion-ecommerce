"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export default function useUpdateBanner() {
  const dispatch = useAppDispatch();

  const updateBanner = async (formData: FormData) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put("/api/update-banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.banner;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateBanner };
}
