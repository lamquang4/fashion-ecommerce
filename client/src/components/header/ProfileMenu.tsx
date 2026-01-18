"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { memo } from "react";

function ProfileMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <>
      <div className="absolute top-full right-0 z-20 bg-white shadow-md rounded-sm overflow-hidden hidden group-hover:block min-w-[120px]">
        {session?.user ? (
          <>
            <p className="border-b p-2.5 border-gray-200 max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
              Xin chào, {session?.user?.fullname}
            </p>

            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              href="/account"
            >
              Thông tin tài khoản
            </Link>

            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              href="/order"
            >
              Đơn hàng
            </Link>

            <Link
              href="/address"
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]  "
            >
              Sổ địa chỉ
            </Link>

            <button
              onClick={() => {
                signOut();
              }}
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem] text-left"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              href="/login"
            >
              Đăng nhập
            </Link>

            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              href="/register"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default memo(ProfileMenu);
