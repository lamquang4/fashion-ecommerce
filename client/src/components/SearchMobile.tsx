"use client";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import SuggestionProduct from "./SuggestionProduct";
type Props = {
  toggleSearch: () => void;
  openSearch: boolean;
};

function SearchMobile({ toggleSearch, openSearch }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
    toggleSearch();
  };

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openSearch]);

  return (
    <div
      className={`absolute left-0 w-full p-[10px_12px] bg-white border-y-[1.2px] border-gray-300 transition-all duration-300 overflow-hidden ${
        openSearch
          ? "opacity-100 visible top-[68px]"
          : "opacity-0 invisible top-[90px]"
      }`}
    >
      <div className="relative">
        <div className="flex items-center">
          <div className="w-full">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                required
                placeholder="Tìm kiếm..."
                maxLength={50}
                autoComplete="off"
                className="w-full px-2 py-2 rounded outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setFocused(false);
                  }, 200);
                }}
              />
            </form>
          </div>

          <button onClick={toggleSearch}>
            <HiMiniXMark size={25} />
          </button>
        </div>

        {focused && search && (
          <div className="fixed left-1/2 translate-x-[-50%] z-12 w-full bg-white shadow-lg border-gray-300 border">
            <SuggestionProduct search={search} />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SearchMobile);
