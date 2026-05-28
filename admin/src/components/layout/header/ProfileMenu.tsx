"use client";
import { memo } from "react";
import Image from "../../ui/Image";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
type Props = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};
function ProfileMenu({ menuOpen, onToggleMenu }: Props) {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <>
      {session?.user && (
        <div
          className="relative"
          onMouseOver={onToggleMenu}
          onMouseOut={onToggleMenu}
        >
          <div className="flex cursor-pointer items-center gap-2">
            <div className="w-[34px] h-[34px] p-1 rounded-full border border-gray-300 overflow-hidden">
              <Image
                src={"/assets/other/user.png"}
                alt={""}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <p className="font-medium">{session?.user.fullname || ""}</p>
          </div>

          {menuOpen && (
            <div
              className={`absolute top-full right-0 max-w z-20 bg-white shadow-md rounded-md border border-gray-200`}
            >
              <p className="border-b p-3 border-gray-300 max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium">
                Xin chào, {session?.user?.fullname}
              </p>

              <Link
                href={"/account"}
                className="block hover:bg-gray-100 p-3 whitespace-nowrap"
              >
                <div className="flex items-center gap-2 font-medium">
                  <FaRegCircleUser size={18} />
                  <p>Tài khoản</p>
                </div>
              </Link>

              <button
                className="w-full hover:bg-gray-100 p-3 text-danger whitespace-nowrap"
                onClick={() => {
                  signOut();
                }}
              >
                <div className="flex items-center gap-2 font-medium text-[#EF5F5F]">
                  <RiLogoutBoxLine size={18} />
                  <p>Đăng xuất</p>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default memo(ProfileMenu);
