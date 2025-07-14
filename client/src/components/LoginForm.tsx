"use client";
import Link from "next/link";
import DifferentLR from "./DifferentLR";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
function LoginForm() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email: data.email.trim(),
        password: data.password.trim(),
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
        setData({
          email: "",
          password: "",
        });
      } else {
        const errorMsg = res?.error || "Email hoặc mật khẩu không đúng";
        toast.error(errorMsg);
      }
    } catch (err) {}
  };
  return (
    <section className="mt-[30px] sm:mt-[45px]">
      <div className="flex flex-col items-center justify-center  px-[10px] sm:px-[15px]">
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-[1.5rem] sm:text-[1.7rem] uppercase font-[550] mb-[20px] text-center text-black">
              Đăng nhập
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/login"
                  className="text-[0.95rem] text-blue-400 font-medium"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng nhập
              </button>
              <p className="flex gap-1.5 justify-center font-light text-[0.95rem]">
                Bạn chưa có tài khoản ư?
                <Link href="/register" className="text-blue-400 font-medium">
                  Đăng kí
                </Link>
              </p>

              <DifferentLR title={"đăng nhập"} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
