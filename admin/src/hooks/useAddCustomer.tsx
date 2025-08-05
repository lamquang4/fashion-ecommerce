"use client";
import { User } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useAddCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const addCustomer = async (data: User) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-customer", data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addCustomer, isLoading };
}
