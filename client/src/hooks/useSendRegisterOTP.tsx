import axios from "axios";
import { useState } from "react";

export function useSendRegisterOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const sendRegisterOTP = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const url = `/api/auth/send-register-otp`;
      await axios.post(url, data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRegisterOTP, isLoading };
}
