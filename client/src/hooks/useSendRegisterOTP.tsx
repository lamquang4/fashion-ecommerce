import axios from "axios";
import { useState } from "react";

export function useSendRegisterOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const sendRegisterOTP = async (data: { email: string }) => {
    if (!data.email) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `/api/auth/otps/user`;
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
