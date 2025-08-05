"use client";
import { Address } from "@/types/type";
import axios from "axios";
import { useState } from "react";

export default function useAddAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const addAddress = async (data: Address) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-address", data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addAddress, isLoading };
}
