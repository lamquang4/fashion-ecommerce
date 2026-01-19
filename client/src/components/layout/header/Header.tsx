"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser, CiSearch } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";
import Overplay from "../../Overplay";
import ProfileMenu from "./ProfileMenu";
import Image from "../../Image";
import useGetCategories from "@/hooks/useGetCategories";
import SearchMobile from "./SearchMobile";
import SearchDesktop from "./SearchDesktop";
import useGetCart from "@/hooks/useGetCart";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useSyncCart } from "@/hooks/useSyncCart";
import { useSyncWishlist } from "@/hooks/useSyncWishlist";
import { useSession } from "next-auth/react";
import MenuDropDown from "./MenuDropDown";
import MenuSide from "./MenuSide";

function Header() {
  const { categoriesMale, categoriesFemale } = useGetCategories();
  const { cart, mutate: mutateCart } = useGetCart();
  const { wishlist, mutate: mutateWishlist } = useGetWishlist();
  const { syncCart } = useSyncCart();
  const { syncWishlist } = useSyncWishlist();
  const { data: session } = useSession();

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);

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
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMenuMobileOpen((prev) => !prev);
    setOpenSearch(false);
  }, []);

  return (
    <>
      <header className="w-full bg-white sticky top-0 border-b border-gray-200 z-15">
        <div className="py-[20px] px-[15px] relative">
          <div className="flex justify-between items-center w-full max-w-[1230px] mx-auto">
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
                <li className="relative group">
                  <span className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                    Nam
                  </span>
                  {categoriesMale.length > 0 && (
                    <MenuDropDown
                      items={[
                        { name: "Đồ nam", href: "/collection/nam" },
                        ...categoriesMale.map((c) => ({
                          name: c.namecategory,
                          href: `/collection/${c.slug}`,
                        })),
                      ]}
                    />
                  )}
                </li>

                <li className="relative group">
                  <span className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                    Nữ
                  </span>
                  {categoriesFemale.length > 0 && (
                    <MenuDropDown
                      items={[
                        { name: "Đồ nữ", href: "/collection/nu" },
                        ...categoriesFemale.map((c) => ({
                          name: c.namecategory,
                          href: `/collection/${c.slug}`,
                        })),
                      ]}
                    />
                  )}
                </li>

                <li className="relative group">
                  <span className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                    Giảm giá
                  </span>

                  <MenuDropDown
                    items={[
                      { name: "Giảm giá đồ nam", href: "/sale/nam" },
                      { name: "Giảm giá đồ nữ", href: "/sale/nu" },
                    ]}
                  />
                </li>

                <li className="cursor-pointer relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100">
                  <Link href={"/blog"}>Tin tức</Link>
                </li>
              </ul>
            </nav>

            <div className="hidden lg:flex items-center gap-5">
              <SearchDesktop />

              <div className="relative cursor-pointer group">
                <CiUser size={24} />
                <ProfileMenu />
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
            <SearchMobile
              onToggleSearch={toggleSearch}
              openSearch={openSearch}
            />

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-[15px] relative">
              <button onClick={toggleSearch} className="text-gray-800">
                <CiSearch size={23} />
              </button>

              <div className="relative cursor-pointer group">
                <CiUser size={23} />
                <ProfileMenu />
              </div>

              <Link href={"/cart"} className="relative">
                <CiShoppingCart size={25} />

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
                <CiHeart size={24} />

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
                <AiOutlineMenu size={23} />
              </button>
            </div>
          </div>
        </div>

        <MenuSide isOpen={menuMobileOpen} onToggleMenu={toggleMobileMenu} />
      </header>

      {openSearch && <Overplay onClose={toggleSearch} IndexForZ={12} />}
    </>
  );
}

export default Header;
