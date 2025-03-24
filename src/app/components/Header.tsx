"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser, CiSearch } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";
import Menumobile from "./Menumobile";
import Overplay from "./Overplay";
import ProfileMenu from "./ProfileMenu";
import Image from "./Image";
function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const toggleSearch = () => {
    setOpenSearch(!openSearch);
    if (menuMobileOpen) setMenuMobileOpen(false);
    if (profileMenuOpen) setProfileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMenuMobileOpen(!menuMobileOpen);
    if (openSearch) setOpenSearch(false);
    if (profileMenuOpen) setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
    if (menuMobileOpen) setMenuMobileOpen(false);
    if (openSearch) setOpenSearch(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1041) {
        setMenuMobileOpen(false);
        setOpenSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <header className="w-full bg-white sticky top-0 border-b border-gray-200 z-[15]">
        <div>
          {/* Header top */}
          <div className="bg-black w-full">
            <div className="py-[9px]">
              <p className="text-white text-center text-[0.8rem] uppercase font-bold">
                Free Ship với đơn hàng trên 100K
              </p>
            </div>
          </div>

          {/* Desktop */}
          <div className="flex justify-between items-center w-full py-[20px] px-[15px] md:px-[20px] lg:px-[40px] relative">
            <Link href={"/"}>
              <Image
                Src={"/assets/other/logo.png"}
                Alt={""}
                ClassName={"w-[80px]"}
              />
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-[30px] text-[1rem] font-[550]">
                <li className="relative">
                  <Link
                    href={"/"}
                    className="relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100"
                  >
                    Trang chủ
                  </Link>
                </li>

                <li className="relative menu-category">
                  <Link
                    href={"/"}
                    className="relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100"
                  >
                    Nam
                  </Link>
                  <ul className="absolute font-light top-full left-0 w-[200px] bg-white p-2 translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Sản phẩm 1
                      </Link>
                    </li>

                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Sản phẩm 2
                      </Link>
                    </li>

                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Sản phẩm 3
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="relative menu-category">
                  <Link
                    href={"/"}
                    className="relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100"
                  >
                    Nữ
                  </Link>
                  <ul className="absolute font-light top-full left-0 w-[200px] bg-white p-2 translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Sản phẩm 1
                      </Link>
                    </li>

                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Sản phẩm 2
                      </Link>
                    </li>

                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Sản phẩm 3
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="relative menu-category">
                  <Link
                    href={"/"}
                    className="relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100"
                  >
                    Giảm giá
                  </Link>
                  <ul className="absolute font-light top-full left-0 w-[200px] bg-white p-2 translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Giảm giá đồ nam
                      </Link>
                    </li>

                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Giảm giá đồ nữ
                      </Link>
                    </li>

                    <li className="my-2">
                      <Link
                        href={"/"}
                        className="text-black text-[0.9rem] py-1 px-5 transition-all duration-200"
                      >
                        Sản phẩm 3
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="relative">
                  <Link
                    href={"/"}
                    className="relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="hidden lg:flex items-center gap-5">
              <div className="relative">
                <form>
                  <input
                    type="text"
                    className="px-3 py-1.5 w-[145px] border border-gray-300 text-[0.8rem] tracking-[0.9px] bg-transparent outline-none"
                    placeholder="Tìm kiếm..."
                    autoComplete="off"
                  />
                  <button
                    className="absolute top-1/2 right-[7px] transform -translate-y-1/2 text-black flex items-center"
                    type="button"
                  >
                    <CiSearch size={21} title="Tìm kiếm" />
                  </button>
                </form>
              </div>

              <div
                className="relative cursor-pointer group"
                onMouseOver={toggleProfileMenu}
                onMouseOut={toggleProfileMenu}
              >
                <CiUser size={24} />
                <ProfileMenu isOpen={profileMenuOpen} />
              </div>
              {/*
      <Link href={"/login"}>
      <CiUser size={24} />
    </Link>
    */}

              <Link href={"/cart"} className="relative">
                <CiShoppingCart size={26} />

                <span
                  className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
                >
                  0
                </span>
              </Link>

              <Link href="/wishlist" className="relative">
                <CiHeart size={25} />

                <span
                  className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
                >
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Search */}
            <div
              className={`absolute left-0 w-full p-[10px_12px] bg-white border-y-[1.2px] border-gray-300 transition-all duration-300 overflow-hidden ${
                openSearch
                  ? "opacity-100 visible top-[65px]"
                  : "opacity-0 invisible top-[90px]"
              }`}
            >
              <div className="flex items-center">
                <form className="w-full">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    autoComplete="off"
                    className="w-full px-2 py-2 rounded outline-none"
                  />
                </form>
                <button onClick={toggleSearch}>
                  <HiMiniXMark size={23} />
                </button>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-4 relative">
              <button onClick={toggleSearch} className="text-gray-800">
                <CiSearch size={24} />
              </button>

              <div
                className="relative cursor-pointer group"
                onMouseOver={toggleProfileMenu}
                onMouseOut={toggleProfileMenu}
              >
                <CiUser size={24} />
                <ProfileMenu isOpen={profileMenuOpen} />
              </div>

              {/*
  <Link href={"/login"}>
  <CiUser size={24} />
</Link>
*/}

              <Link href={"/cart"} className="relative">
                <CiShoppingCart size={26} />

                <span
                  className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
                >
                  0
                </span>
              </Link>

              <Link href={"/wishlist"} className="relative">
                <CiHeart size={25} />

                <span
                  className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
                >
                  0
                </span>
              </Link>
              <button onClick={toggleMobileMenu}>
                <AiOutlineMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Menumobile isOpen={menuMobileOpen} toggleMenu={toggleMobileMenu} />
      {openSearch && <Overplay closeMenu={toggleSearch} IndexForZ={12} />}
    </>
  );
}

export default Header;
