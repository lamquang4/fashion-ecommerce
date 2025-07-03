"use client";
import axios from "axios";

export default function useAddCategory() {
  const addCategory = async (formData: FormData) => {
    try {
      const res = await axios.post("/api/add-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.category;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addCategory };
}
