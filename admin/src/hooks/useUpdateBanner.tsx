"use client";
import axios from "axios";

export default function useUpdateBanner() {

  const updateBanner = async (formData: FormData) => {
    try {
      const res = await axios.put("/api/update-banner", formData, {
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

  return { updateBanner };
}
