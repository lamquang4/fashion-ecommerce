"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export default function useAddBanner() {
  const dispatch = useAppDispatch();

  const addBanner = async (formData: FormData) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/add-banner", formData, {
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

  return { addBanner };
}
