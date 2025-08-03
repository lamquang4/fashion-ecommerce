"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "./Image";
import useGetProductsSuggest from "@/hooks/useGetProductsSuggest";
import Loading from "./Loading";
function SearchDesktop() {
  const [search, setSearch] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const router = useRouter();
  const { products, setKeyword, isLoading } = useGetProductsSuggest();

  useEffect(() => {
    if (search) {
      setKeyword(search);
    }
  }, [search]);

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
          className="px-3 py-1.5 w-[145px] border border-gray-300 text-[0.8rem] tracking-[0.9px] bg-transparent outline-none"
          required
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
          className="absolute top-1/2 right-[7px] transform -translate-y-1/2 text-black flex items-center"
          type="submit"
        >
          <CiSearch size={21} title="Tìm kiếm" />
        </button>
      </form>

      {focused && search && (
        <div className="fixed top-12 right-12 z-[12] mt-3 w-96 max-w-[calc(100%-30px)] bg-white shadow-lg border-gray-200 border">
          <div className="p-2.5">
            <p className="text-black font-medium">
              Kết quả tìm kiếm cho{" "}
              <span className="text-red-600">{search}</span>
            </p>
          </div>

          <div className="overflow-y-auto max-h-96 flex flex-col">
            {isLoading ? (
              <Loading height={25} size={35} color={"#c00"} />
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <div className="flex w-full" key={index}>
                  <Link href={`/product/${product.slug}`} className="w-full">
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
  );
}

export default SearchDesktop;
