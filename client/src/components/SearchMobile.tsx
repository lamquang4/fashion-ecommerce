"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";

type Props = {
  toggleSearch: () => void;
  openSearch: boolean;
};

function SearchMobile({ toggleSearch, openSearch }: Props) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  return (
    <div
      className={`absolute left-0 w-full p-[10px_12px] bg-white border-y-[1.2px] border-gray-300 transition-all duration-300 overflow-hidden ${
        openSearch
          ? "opacity-100 visible top-[65px]"
          : "opacity-0 invisible top-[90px]"
      }`}
    >
      <div className="flex items-center">
        <form className="w-full" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            autoComplete="off"
            className="w-full px-2 py-2 rounded outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <button onClick={toggleSearch} title="Đóng">
          <HiMiniXMark size={23} title="Đóng" />
        </button>
      </div>
    </div>
  );
}

export default SearchMobile;
