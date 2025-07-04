"use client";
import { Size } from "@/types/types";
import axios from "axios";


export default function useAddSize() {
  const addSize = async (data: Size) => {
    try {
      const res = await axios.post("/api/add-size", data);
      return res.data.size;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addSize };
}
