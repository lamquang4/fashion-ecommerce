"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileMenu from "./ProfileMenu";
import Notification from "./Notification";

type HeaderProps = {
  toggleMenu: () => void;
};

function Header({ toggleMenu }: HeaderProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const [notifiMenuOpen, setNotifiMenuOpen] = useState(false);
  const toggleNotifiMenu = () => {
    setNotifiMenuOpen((prev) => !prev);
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

          <div className="flex gap-[20px] items-center">
            <Notification
              toggleMenu={toggleNotifiMenu}
              menuOpen={notifiMenuOpen}
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
