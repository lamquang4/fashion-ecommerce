"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { memo } from "react";

type ProfileMenuProp = {
  isOpen: boolean;
};

function ProfileMenu({ isOpen }: ProfileMenuProp) {
  const { data: session, status } = useSession();

  if (!isOpen || status === "loading") return null;

  return (
    <>
      {session?.user ? (
        <div className="w-[180px] absolute top-[22px] right-[-40px] overflow-hidden z-20 bg-white shadow-md rounded-md font-normal">
          <p className="border-b p-2.5 border-gray-200 max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
            Xin chào, {session?.user?.fullname}
          </p>

          <Link
            href="/account"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem]  "
          >
            Thông tin tài khoản
          </Link>

          <Link
            href="/order"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem]  "
          >
            Đơn hàng
          </Link>

          <Link
            href="/address"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem]  "
          >
            Sổ địa chỉ
          </Link>

          <button
            onClick={() => {
              signOut();
            }}
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem]   text-left"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="w-[120px] absolute top-[22px] right-[-40px] overflow-hidden z-20 bg-white shadow-md rounded-md font-normal">
          <Link
            href="/login"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem]  "
          >
            Đăng nhập
          </Link>

          <Link
            href="/register"
            className="hover:bg-[#F7F7F7] w-full block p-2.5 text-[0.95rem]  "
          >
            Đăng kí
          </Link>
        </div>
      )}
    </>
  );
}

export default memo(ProfileMenu);
