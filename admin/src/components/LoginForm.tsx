"use client";
import Image from "./Image";
import { GoLock } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
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
        redirect: false,
        email: data.email.trim(),
        password: data.password.trim(),
      });

      if (res?.ok) {
        router.replace("/dashboard");
        toast.success("Đăng nhập thành công");
      } else {
        const errorMsg = res?.error || "Email hoặc mật khẩu không đúng";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <section className="bg-[#F9FAFB] w-full h-screen flex justify-center items-center flex-col gap-[30px] px-[15px]">
      <div>
        <Image
          Src={"/assets/other/logo.png"}
          Alt={""}
          ClassName={"w-[100px]"}
          loadingType="eager"
        />
      </div>
      <div className="relative max-w-[420px] w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mx-5">
        <div className="flex items-center h-[440px] w-[200%]">
          <div className="w-1/2 px-8 bg-white">
            <h2 className="relative text-center uppercase">Đăng nhập</h2>

            <form action="" onSubmit={handleSubmit}>
              <div className="relative h-12 w-full mt-8 focus-within:text-blue-500">
                <AiOutlineMail
                  className="z-99 absolute left-0 top-1/2 transform -translate-y-1/2  transition-all duration-200 focus-within:text-blue-500"
                  size={20}
                />
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  className="absolute text-[0.9rem] h-full w-full px-8 outline-none border-b-2 border-gray-300 transition-all duration-200 focus:border-blue-500"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="relative h-12 w-full mt-8 focus-within:text-blue-500">
                <GoLock
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 focus-within:text-blue-500"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="absolute text-[0.9rem] h-full w-full px-8 outline-none border-b-2 border-gray-300 transition-all duration-200 focus:border-blue-500"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <button className="mt-8 w-full text-[1rem] py-2 text-white font-medium tracking-wide rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
