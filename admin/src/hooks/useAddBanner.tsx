"use client";
import axios from "axios";

export default function useAddBanner() {
  const addBanner = async (formData: FormData) => {
    try {
      const res = await axios.post("/api/add-banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.banner;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addBanner };
}
