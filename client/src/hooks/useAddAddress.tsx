"use client";
import { Address } from "@/types/type";
import axios from "axios";
import { useState } from "react";

export default function useAddAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const addAddress = async (data: Address) => {
    if (!data) {
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("/api/addresses", data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addAddress, isLoading };
}
