"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Size {
  _id?: string;
  namesize: string;
}

export default function useUpdateSize(id: string) {
  const dispatch = useAppDispatch();
  const updateSize = async (data: Size) => {
    if (!id) throw new Error("ID không hợp lệ");
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/update-size/${id}`, data);
      return res.data.size;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateSize };
}
