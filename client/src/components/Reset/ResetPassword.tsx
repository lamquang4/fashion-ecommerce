"use client";
import Link from "next/link";
import { useState } from "react";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <section className="my-[60px]">
      <div className="mx-auto max-w-[1230px] w-full px-[10px] sm:px-[15px]">
        <div className="flex items-center justify-center">
          <div className="max-w-sm w-full">
            <h2 className="uppercase mb-[20px] text-center text-black">
              Khôi phục mật khẩu
            </h2>
            <form className="space-y-[15px]">
              <div className="space-y-[5px]">
                <label htmlFor="" className="block text-[0.9rem] font-medium">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="mt-4">
                <Link
                  href="/login"
                  className="text-[0.9rem] text-blue-400 font-medium"
                >
                  Quay lại
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white focus:outline-none font-semibold rounded-sm text-[1rem] px-5 py-2.5 text-center"
              >
                Gửi mã xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
