"use client";
import { User } from "@/types/type";
import axios from "axios";
import { useState } from "react";

export default function useAddCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const addCustomer = async (data: User) => {
    setIsLoading(true);
    try {
      const url = `/api/add-customer`;
      await axios.post(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addCustomer, isLoading };
}
