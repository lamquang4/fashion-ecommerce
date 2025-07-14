"use client";
import axios from "axios";

export default function useAddCart() {
  const addCart = async (formData: FormData) => {
    try {
      const res = await axios.post("/api/add-cart", formData);
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addCart };
}
