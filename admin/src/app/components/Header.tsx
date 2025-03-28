import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
function Header() {
  return (
    <>
      <header className="sticky top-0 z-20 flex w-full border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:border-b">
        <div className="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
          <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
            <button>
              <AiOutlineMenu />
            </button>

            <Link href={"/"} className="lg:hidden">
              <img src="" alt="" />
            </Link>

            <button>
              <SlOptions />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
