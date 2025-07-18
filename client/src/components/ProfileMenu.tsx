"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useGetCustomer from "@/hooks/useGetCustomer";

type ProfileMenuProp = {
  isOpen: boolean;
};

function ProfileMenu({ isOpen }: ProfileMenuProp) {
  const { data: session, status } = useSession();
  const { customer, isLoading } = useGetCustomer(session?.user.id || "");

  if (!isOpen || status === "loading" || isLoading) return null;

  return (
    <div>
      {session?.user ? (
        <div className="w-[190px] absolute top-[25px] right-[-40px] overflow-hidden z-20 duration-400 ease-in-out bg-white shadow-md rounded-md ">
          <h2 className="cursor-pointer border-b p-3 border-gray-300 text-[0.95rem] max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
            Xin chào, {customer?.fullname}
          </h2>

          <Link
            href="/account"
            className="hover:bg-[#F7F7F7] w-full block p-3 text-[0.95rem] text-black"
          >
            Thông tin tài khoản
          </Link>

          <Link
            href="/order"
            className="hover:bg-[#F7F7F7] w-full block p-3 text-[0.95rem] text-black"
          >
            Đơn hàng của bạn
          </Link>

          <button
            onClick={() => signOut()}
            className="hover:bg-[#F7F7F7] w-full block p-3 text-[0.95rem] text-black text-left"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="w-[120px] absolute top-[25px] right-[-40px] overflow-hidden z-20 duration-400 ease-in-out bg-white shadow-md rounded-md ">
          <Link
            href="/login"
            className="hover:bg-[#F7F7F7] w-full block p-3 text-[0.95rem] text-black"
          >
            Đăng nhập
          </Link>

          <Link
            href="/register"
            className="hover:bg-[#F7F7F7] w-full block p-3 text-[0.95rem] text-black"
          >
            Đăng kí
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
