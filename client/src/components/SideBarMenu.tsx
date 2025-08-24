"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HiOutlineBuildingOffice, HiOutlineUser } from "react-icons/hi2";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { memo } from "react";
function SideBarMenu() {
  const pathname = usePathname();
  const activeClass = "bg-gray-200 rounded-md font-semibold";
  return (
    <div className="w-full max-w-full lg:max-w-[300px]">
      <div className="text-[0.9rem]   font-medium flex flex-col gap-2">
        <Link
          href="/account"
          className={`py-3.5 px-4 ${
            pathname === "/account" ? activeClass : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <HiOutlineUser size={20} />
            <span>Thông tin toàn khoản</span>
          </div>
        </Link>

        <Link
          href="/address"
          className={`py-3.5 px-4 ${
            pathname === "/address" ? activeClass : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <HiOutlineBuildingOffice size={20} />
            <span>Sổ địa chỉ</span>
          </div>
        </Link>

        <Link
          href="/order"
          className={`py-3.5 px-4 ${
            pathname === "/order" || pathname.startsWith("/order-detail")
              ? activeClass
              : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <IoBagHandleOutline size={20} />
            <span>Đơn hàng</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => signOut()}
          className="py-3.5 px-4 hover:bg-gray-100 text-left text-red-500 font-medium"
        >
          <div className="flex items-center gap-2.5">
            <LuDoorOpen size={22} />
            <span>Đăng xuất</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default memo(SideBarMenu);
