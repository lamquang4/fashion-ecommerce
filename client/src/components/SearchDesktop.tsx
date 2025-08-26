"use client";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SuggestionProduct from "./SuggestionProduct";
function SearchDesktop() {
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
  };
  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="px-3 py-1.5 pr-7 w-[145px] border border-gray-300 text-[0.8rem] placeholder:text-[0.8rem] bg-transparent outline-none"
          required
          maxLength={50}
          placeholder="Tìm kiếm..."
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocused(false);
            }, 200);
          }}
        />
        <button
          className="absolute top-1/2 right-[7px] transform -translate-y-1/2   flex items-center"
          type="submit"
        >
          <CiSearch size={20} />
        </button>
      </form>

      {focused && search && (
        <div className="fixed top-12 right-12 z-12 w-96 max-w-[calc(100%-30px)] bg-white shadow-lg border-gray-300 border">
          <SuggestionProduct search={search} />
        </div>
      )}
    </div>
  );
}

export default memo(SearchDesktop);
