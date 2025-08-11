"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import Image from "./Image";
import Link from "next/link";
import useGetProductsSuggest from "@/hooks/useGetProductsSuggest";
import Loading from "./Loading";
type Props = {
  toggleSearch: () => void;
  openSearch: boolean;
};

function SearchMobile({ toggleSearch, openSearch }: Props) {
  const [search, setSearch] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const { products, setKeyword, isLoading } = useGetProductsSuggest();
  const router = useRouter();

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
    if (search) {
      setKeyword(search.trim());
    }
  }, [search, setKeyword]);

  return (
    <div
      className={`absolute left-0 w-full p-[10px_12px] bg-white border-y-[1.2px] border-gray-300 transition-all duration-300 overflow-hidden ${
        openSearch
          ? "opacity-100 visible top-[65px]"
          : "opacity-0 invisible top-[90px]"
      }`}
    >
      <div className="relative">
        <div className="flex items-center">
          <form className="w-full" onSubmit={handleSearch}>
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
          <button onClick={toggleSearch} title="Đóng">
            <HiMiniXMark size={23} title="Đóng" />
          </button>
        </div>

        {focused && search && (
          <div className="fixed left-1/2 translate-x-[-50%] z-[12] w-full bg-white shadow-lg border-gray-200 border">
            <div className="p-2.5">
              <p className="text-black font-medium">
                Kết quả tìm kiếm cho{" "}
                <span className="text-red-600">{search}</span>
              </p>
            </div>

            <div className="overflow-y-auto max-h-96 flex flex-col">
              {isLoading ? (
                <Loading height={30} size={40} color={"#c00"} thickness={3} />
              ) : products.length > 0 ? (
                products.map((product) => (
                  <div className="flex w-full" key={product._id}>
                    <Link
                      href={`/product/${product.slug}`}
                      className="w-full"
                      onClick={toggleSearch}
                    >
                      <div className="hover:bg-[#F7F7F7] p-2.5 w-full flex gap-3.5 border-t border-gray-200">
                        <div>
                          <Image
                            Src={product.variants[0].images[0]}
                            Alt=""
                            ClassName="w-[80px] h-full object-cover"
                            loadingType="eager"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 text-[0.9rem]">
                          <h2>{product.name}</h2>
                          {product.discount > 0 && (
                            <del className="text-[#707072]">
                              {product.price.toLocaleString("vi-VN")}₫
                            </del>
                          )}
                          <p className="font-medium text-[#c00]">
                            {(
                              product.price - product.discount || product.price
                            ).toLocaleString("vi-VN")}
                            ₫
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-[0.9rem] text-gray-500">
                  Không tìm thấy kết quả
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchMobile;
