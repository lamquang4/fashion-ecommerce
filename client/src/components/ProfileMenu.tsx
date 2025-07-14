"use client";
import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import useGetCustomer from "@/hooks/useGetCustomer";
type ProfileMenuProp = {
  isOpen: boolean;
};
function ProfileMenu({ isOpen }: ProfileMenuProp) {
  const { data: session } = useSession();
  const { customer, isLoading } = useGetCustomer(session?.user.id || "");
  return (
    <>
      {session?.user && !isLoading && (
        <div
          className={`absolute top-[35px] right-[-40px] w-[210px] overflow-hidden z-20 transition-max-height duration-400 ease-in-out bg-white group-hover:max-h-[400px] shadow-md rounded-[6px] ${
            isOpen ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <div>
            <h2 className="cursor-pointer border-b p-3 border-gray-300 text-[0.95rem] max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
              Xin chào, {customer?.fullname}
            </h2>

            <Link
              href={"/account"}
              className="hover:bg-[#F7F7F7] w-full items-center p-3"
            >
              <div className="!flex items-center gap-[8px] text-[#878a99]">
                <HiOutlineUser size={20} />
                <p className="text-[0.95rem]">Thông tin tài khoản</p>
              </div>
            </Link>

            <Link href={"/order"} className="hover:bg-[#F7F7F7] w-full p-3">
              <div className="!flex items-center gap-[8px] text-[#878a99]">
                <IoBagHandleOutline size={20} />
                <p className="text-[0.95rem]">Đơn hàng của bạn</p>
              </div>
            </Link>

            <button
              onClick={() => signOut()}
              className="hover:bg-[#F7F7F7] w-full p-3"
            >
              <div className="!flex items-center gap-[8px] text-[#878a99]">
                <LuDoorOpen size={20} />
                <p className="text-[0.95rem]">Đăng xuất</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileMenu;
