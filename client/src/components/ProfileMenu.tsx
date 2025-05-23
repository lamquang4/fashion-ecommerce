"use client";
import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
type ProfileMenuProp = {
  isOpen: boolean;
};
function ProfileMenu({ isOpen }: ProfileMenuProp) {
  return (
    <div
      className={`absolute top-[35px] right-[-40px] w-[210px] overflow-hidden z-20 transition-max-height duration-400 ease-in-out bg-white group-hover:max-h-[400px] shadow-md rounded-[6px] ${
        isOpen ? "max-h-[400px]" : "max-h-0"
      }`}
    >
      <div className="px-[15px]">
        <h2 className="cursor-pointer text-[0.95rem] max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center my-[15px]">
          Xin chào, Quang Lam
        </h2>

        <hr className="border-0 h-[1px] w-full bg-gray-300" />

        <Link
          href={"/account"}
          className="w-full justify-left items-center py-[15px]"
        >
          <div className="!flex items-center gap-[8px] text-[#878a99]">
            <HiOutlineUser size={20} />
            <p className="text-[0.95rem]">Thông tin tài khoản</p>
          </div>
        </Link>

        <Link href={"/order"} className="w-full justify-left py-[15px]">
          <div className="!flex items-center gap-[8px] text-[#878a99]">
            <IoBagHandleOutline size={20} />
            <p className="text-[0.95rem]">Đơn hàng của bạn</p>
          </div>
        </Link>

        <Link href={"/login"} className="w-full justify-left py-[15px]">
          <div className="!flex items-center gap-[8px] text-[#878a99]">
            <LuDoorOpen size={20} />
            <p className="text-[0.95rem]">Đăng xuất</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileMenu;
