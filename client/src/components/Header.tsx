"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useSyncCart } from "@/hooks/useSyncCart";
import { useSyncWishlist } from "@/hooks/useSyncWishlist";
import { useSession } from "next-auth/react";

function Header() {
  const { categoriesMale, categoriesFemale } = useGetCategories();
  const { cart, mutate: mutateCart } = useGetCart();
  const { wishlist, mutate: mutateWishlist } = useGetWishlist();
  const { syncCart } = useSyncCart();
  const { syncWishlist } = useSyncWishlist();
  const { data: session } = useSession();

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);

  const totalQuantity = useMemo(() => {
    return (
      cart?.productsInCart.reduce((sum, item) => {
        return sum + (item?.variant?.quantity || 0);
      }, 0) || 0
    );
  }, [cart?.productsInCart]);

  const toggleSearch = useCallback(() => {
    setOpenSearch((prev) => !prev);
    setMenuMobileOpen(false);
    setProfileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMenuMobileOpen((prev) => !prev);
    setOpenSearch(false);
    setProfileMenuOpen(false);
  }, []);

  const toggleProfileMenu = useCallback(() => {
    setProfileMenuOpen((prev) => !prev);
    setMenuMobileOpen(false);
    setOpenSearch(false);
  }, []);

  useEffect(() => {
    if (session?.user) {
      (async () => {
        await syncCart();
        mutateCart();
        await syncWishlist();
        mutateWishlist();
      })();
    }
  }, [session?.user, mutateCart, mutateWishlist]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
        <div className="flex justify-between items-center w-full py-[20px]  px-[15px] lg:px-[40px] relative">
          <Link href={"/"}>
            <Image
              Src={"/assets/other/logo.png"}
              Alt={"logo"}
              ClassName={"w-[80px]"}
              loadingType="eager"
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-[30px] text-[0.9rem] font-semibold uppercase">
              <li className="relative menu-category">
                <span className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                  Nam
                </span>
                {categoriesMale.length > 0 && (
                  <ul className="text-[#707072] absolute font-medium top-5 left-0 w-[200px] bg-white translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                    <li>
                      <Link
                        href={`/collection/nam`}
                        className="  text-[0.9rem] p-3 transition-all duration-200 hover:text-black"
                      >
                        Đồ nam
                      </Link>
                    </li>
                    {categoriesMale.map((category, index) => (
                      <li key={index}>
                        <Link
                          href={`/collection/${category.slug}`}
                          className="  text-[0.9rem] p-3 transition-all duration-200 hover:text-black"
                        >
                          {category.namecategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li className="relative menu-category">
                <span className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                  Nữ
                </span>
                {categoriesFemale.length > 0 && (
                  <ul className="text-[#707072] absolute font-medium top-full left-0 w-[200px] bg-white translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                    <li>
                      <Link
                        href={`/collection/nu`}
                        className="  text-[0.9rem] p-3 transition-all duration-200 hover:text-black"
                      >
                        Đồ nữ
                      </Link>
                    </li>
                    {categoriesFemale.map((category, index) => (
                      <li key={index}>
                        <Link
                          href={`/collection/${category.slug}`}
                          className="  text-[0.9rem] p-3 transition-all duration-200 hover:text-black"
                        >
                          {category.namecategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li className="relative menu-category">
                <span className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                  Giảm giá
                </span>

                <ul className="text-[#707072] absolute font-medium top-full left-0 w-[200px] bg-white translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[12px] dropdown-list">
                  <li>
                    <Link
                      href={"/sale/nam"}
                      className="text-[0.9rem] p-3 transition-all duration-200 hover:text-black"
                    >
                      Giảm giá đồ nam
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={"/sale/nu"}
                      className="text-[0.9rem] p-3 transition-all duration-200 hover:text-black"
                    >
                      Giảm giá đồ nữ
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="relative menu-category">
                <Link href={"/blog"}>Tin tức</Link>
              </li>
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <SearchDesktop />

            <div
              className="relative cursor-pointer group"
              onMouseEnter={toggleProfileMenu}
              onMouseLeave={toggleProfileMenu}
            >
              <CiUser size={24} />
              <ProfileMenu isOpen={profileMenuOpen} />
            </div>

            <Link href={"/cart"} className="relative">
              <CiShoppingCart size={26} />

              <small
                className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
              >
                {totalQuantity}
              </small>
            </Link>

            <Link href="/wishlist" className="relative">
              <CiHeart size={25} />

              <small
                className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
              >
                {wishlist?.productsInWishlist.length || 0}
              </small>
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

              <small
                className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
              >
                {totalQuantity}
              </small>
            </Link>

            <Link href={"/wishlist"} className="relative">
              <CiHeart size={25} />

              <small
                className="absolute flex items-center justify-center 
    top-[-9px] right-[-11px] 
    bg-[#197FB6] text-white text-[0.7rem] font-medium leading-none 
    rounded-full w-[20px] h-[20px]"
              >
                {wishlist?.productsInWishlist.length || 0}
              </small>
            </Link>
            <button onClick={toggleMobileMenu}>
              <AiOutlineMenu size={24} />
            </button>
          </div>
        </div>

        <Menumobile isOpen={menuMobileOpen} toggleMenu={toggleMobileMenu} />
      </header>

      {openSearch && <Overplay closeMenu={toggleSearch} IndexForZ={12} />}
    </>
  );
}

export default Header;
