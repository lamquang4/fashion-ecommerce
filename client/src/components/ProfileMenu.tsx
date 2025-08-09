"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

type ProfileMenuProp = {
  isOpen: boolean;
};

function ProfileMenu({ isOpen }: ProfileMenuProp) {
  const { data: session, status } = useSession();

  if (!isOpen || status === "loading") return null;

  return (
    <div>
      {session?.user ? (
        <div className="w-[185px] absolute top-[22px] right-[-40px] overflow-hidden z-20 duration-400 ease-in-out bg-white shadow-md rounded-md ">
          <h2 className="cursor-pointer border-b p-2.5 border-gray-300 text-[0.95rem] max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
            Xin chào, {session?.user?.fullname}
          </h2>

          <Link
            href="/account"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem] text-black"
          >
            Thông tin tài khoản
          </Link>

          <Link
            href="/address"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem] text-black"
          >
            Sổ địa chỉ
          </Link>

          <Link
            href="/order"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem] text-black"
          >
            Đơn hàng
          </Link>

          <button
            onClick={() => signOut()}
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem] text-black text-left"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="w-[120px] absolute top-[22px] right-[-40px] overflow-hidden z-20 duration-400 ease-in-out bg-white shadow-md rounded-md ">
          <Link
            href="/login"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem] text-black"
          >
            Đăng nhập
          </Link>

          <Link
            href="/register"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem] text-black"
          >
            Đăng kí
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
