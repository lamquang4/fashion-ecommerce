"use client";
import { Color } from "@/types/types";
import axios from "axios";

export default function useAddColor() {
  const addColor = async (data: Color) => {
    try {
      const res = await axios.post("/api/add-color", data);
      return res.data.color;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addColor };
}
