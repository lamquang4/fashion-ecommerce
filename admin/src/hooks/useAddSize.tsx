"use client";
import { Size } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useAddSize() {
  const [isLoading, setIsLoading] = useState(false);
  const addSize = async (data: Size) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-size", data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addSize, isLoading };
}
