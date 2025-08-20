"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TbMaximize } from "react-icons/tb";
import ProfileMenu from "./ProfileMenu";
import Notification from "./Notification";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  toggleMenu: () => void;
};

function Header({ toggleMenu }: HeaderProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [notifyMenuOpen, setNotifyMenuOpen] = useState<boolean>(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const toggleProfileMenu = useCallback(() => {
    setProfileMenuOpen((prev) => !prev);
    setNotifyMenuOpen(false);
  }, []);

  const toggleNotifyMenu = useCallback(() => {
    setNotifyMenuOpen((prev) => !prev);
    setProfileMenuOpen(false);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <>
      <header className="sticky top-0 z-20 flex w-full bg-white border-b-gray-200 items-center border-b">
        <div className="w-full flex justify-between items-center sm:px-[20px] py-3 px-[15px]">
          <button
            onClick={toggleMenu}
            className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 justify-center items-center flex"
          >
            <AiOutlineMenu size={20} />
          </button>

          <div className="flex gap-[15px] sm:gap-[20px] items-center">
            <button
              onClick={handleFullscreen}
              className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 justify-center items-center flex relative"
            >
              <TbMaximize size={21} />
            </button>

            <Notification
              toggleMenu={toggleNotifyMenu}
              menuOpen={notifyMenuOpen}
            />

            <ProfileMenu
              toggleMenu={toggleProfileMenu}
              menuOpen={profileMenuOpen}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
