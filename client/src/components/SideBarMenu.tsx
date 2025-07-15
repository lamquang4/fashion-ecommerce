"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
function SideBarMenu() {
  const pathname = usePathname();
  const activeClass = "font-medium";
  return (
    <div className="w-full max-w-full lg:max-w-[250px] border border-gray-300">
      <div className="p-[25px_15px] sm:p-[30px_20px] text-[0.95rem] text-black font-normal flex flex-col gap-1">
        <Link
          href="/account"
          className={`py-2.5 ${pathname === "/account" ? activeClass : ""}`}
        >
          <span>Thông tin tài khoản</span>
        </Link>

        <Link
          href="/address"
          className={`py-2.5 ${pathname === "/address" ? activeClass : ""}`}
        >
          <span>Sổ địa chỉ</span>
        </Link>

        <Link
          href="/order"
          className={`py-2.5 ${pathname === "/order" ? activeClass : ""}`}
        >
          <span>Đơn hàng của bạn</span>
        </Link>

        <button
          type="button"
          onClick={() => signOut()}
          className="py-2.5 text-left text-[1rem] text-red-500 font-semibold"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default SideBarMenu;
