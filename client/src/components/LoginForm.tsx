"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useGetCart from "@/hooks/useGetCart";
import { useSyncCart } from "@/hooks/useSyncCart";
import { useSyncWishlist } from "@/hooks/useSyncWishlist";
function LoginForm() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const { mutate } = useGetCart();
  const { syncCart } = useSyncCart();
  const { syncWishlist } = useSyncWishlist();

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
        router.replace("/");
        setData({
          email: "",
          password: "",
        });

        syncCart();
        syncWishlist();

        mutate();
      } else {
        const errorMsg = res?.error || "Email hoặc mật khẩu không đúng";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <section className="my-[60px]">
      <div className="mx-auto max-w-[1230px] w-full px-[10px] sm:px-[15px]">
        <div className="flex items-center justify-center">
          <div className="max-w-sm w-full">
            <h2 className="uppercase mb-[20px] text-center text-black">
              Đăng nhập
            </h2>
            <form className="space-y-[15px]" onSubmit={handleSubmit}>
              <div className="space-y-[5px]">
                <label htmlFor="" className="block   text-[0.9rem] font-medium">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="space-y-[5px]">
                <label htmlFor="" className="block   text-[0.9rem] font-medium">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                  required
                />
              </div>

              <div className="mt-3.5">
                <Link
                  href="/login"
                  className="text-[0.9rem] text-blue-400 font-medium"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white focus:outline-none font-semibold rounded-sm text-[1rem] px-5 py-2.5 text-center"
              >
                Đăng nhập
              </button>

              <p className="flex text-black gap-1.5 justify-center font-medium">
                Bạn chưa có tài khoản ư?
                <Link href="/register" className="text-blue-400 font-medium">
                  Đăng kí
                </Link>
              </p>

              {/*
              <DifferentLR title={"đăng nhập"} />
  */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
