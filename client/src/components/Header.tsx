"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser, CiSearch } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";
import Menumobile from "./Menumobile";
import Overplay from "./Overplay";
import ProfileMenu from "./ProfileMenu";
import Image from "./Image";
import useGetCategories from "@/hooks/useGetCategories";
import SearchMobile from "./SearchMobile";
import SearchDesktop from "./SearchDesktop";
import useGetCart from "@/hooks/useGetCart";
import useGetWishlist from "@/hooks/useGetWishlist";

function Header() {
  const { cart } = useGetCart();
  const { wishlist } = useGetWishlist();
  const { categoriesMale, categoriesFemale } = useGetCategories();

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);

  const totalQuantity =
    cart?.productsInCart.reduce((sum, item) => {
      return sum + (item?.variant?.quantity || 0);
    }, 0) || 0;

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
          <div className="bg-black w-full hidden">
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
                Alt={"logo"}
                ClassName={"w-[80px]"}
                loadingType="eager"
              />
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-[30px] text-[1rem] font-semibold uppercase">
                <li className="relative menu-category">
                  <p className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                    Nam
                  </p>
                  {categoriesMale.length > 0 && (
                    <ul className="absolute font-medium top-5 left-0 w-[200px] bg-white translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                      <li className="my-2">
                        <Link
                          href={`/collection/nam`}
                          className="text-black text-[0.9rem] py-1.5 px-5 transition-all duration-200"
                        >
                          Đồ nam
                        </Link>
                      </li>
                      {categoriesMale.map((category, index) => (
                        <li className="my-2" key={index}>
                          <Link
                            href={`/collection/${category.slug}`}
                            className="text-black text-[0.9rem] py-1.5 px-5 transition-all duration-200"
                          >
                            {category.namecategory}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="relative menu-category">
                  <p className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                    Nữ
                  </p>
                  {categoriesFemale.length > 0 && (
                    <ul className="absolute font-medium top-full left-0 w-[200px] bg-white translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                      <li className="my-2">
                        <Link
                          href={`/collection/nu`}
                          className="text-black text-[0.9rem] py-1.5 px-5 transition-all duration-200"
                        >
                          Đồ nữ
                        </Link>
                      </li>
                      {categoriesFemale.map((category, index) => (
                        <li className="my-2" key={index}>
                          <Link
                            href={`/collection/${category.slug}`}
                            className="text-black text-[0.9rem] py-1.5 px-5 transition-all duration-200"
                          >
                            {category.namecategory}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="relative menu-category">
                  <p className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                    Giảm giá
                  </p>

                  <ul className="absolute font-medium top-full left-0 w-[200px] bg-white translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                    <li className="my-2">
                      <Link
                        href={"/sale/nam"}
                        className="text-black text-[0.9rem] py-1.5 px-5 transition-all duration-200"
                      >
                        Giảm giá đồ nam
                      </Link>
                    </li>

                    <li className="my-2">
                      <Link
                        href={"/sale/nu"}
                        className="text-black text-[0.9rem] py-1.5 px-5 transition-all duration-200"
                      >
                        Giảm giá đồ nữ
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            <div className="hidden lg:flex items-center gap-5">
              <SearchDesktop />

              <div
                className="relative cursor-pointer group"
                onMouseEnter={() => setProfileMenuOpen(true)}
                onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <CiUser size={24} />
                <ProfileMenu isOpen={profileMenuOpen} />
              </div>

              <Link href={"/cart"} className="relative">
                <CiShoppingCart size={26} />

                <span
                  className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
                >
                  {totalQuantity}
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
                  {wishlist?.productsInWishlist.length || 0}
                </span>
              </Link>
            </div>

            {/* Mobile Search */}
            <SearchMobile toggleSearch={toggleSearch} openSearch={openSearch} />

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

              <Link href={"/cart"} className="relative">
                <CiShoppingCart size={26} />

                <span
                  className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
                >
                  {totalQuantity}
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
                  {wishlist?.productsInWishlist.length || 0}
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
