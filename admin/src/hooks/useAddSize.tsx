"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Size {
  _id?: string;
  namesize: string;
}

export default function useAddSize() {
  const dispatch = useAppDispatch();

  const addSize = async (data: Size) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/add-size", data);
      return res.data.size;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { addSize };
}
