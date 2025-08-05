"use client";
import { User } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useAddAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const addAdmin = async (data: User) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-admin", data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addAdmin, isLoading };
}
