"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "./Image";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";
function SearchDesktop() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { products, isLoading, setKeyword } = useGetProductsSearch();

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
          placeholder="Tìm kiếm..."
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="absolute top-1/2 right-[7px] transform -translate-y-1/2 text-black flex items-center"
          type="submit"
        >
          <CiSearch size={21} title="Tìm kiếm" />
        </button>
      </form>

      {search && (
        <div className="fixed top-15 right-12 z-[12] mt-3 w-96 max-w-[calc(100%-30px)] bg-white rounded-lg shadow-md">
          <div className="p-2">
            <p className="text-black font-medium">
              Kết quả tìm kiếm cho{" "}
              <span className="text-red-600">{search}</span>
            </p>
          </div>

          <div className="overflow-y-auto max-h-96 flex flex-col">
            {products.map((product, index) => (
              <div className="flex w-full" key={index}>
                <Link href={`/product/${product.slug}`} className="w-full">
                  <div className="hover:bg-[#F7F7F7] p-2 w-full flex gap-3.5 border-t border-gray-200">
                    <div>
                      <Image
                        Src={product.variants[0].images[0]}
                        Alt=""
                        ClassName="w-[80px] h-full object-cover "
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
                      {product.discount > 0 ? (
                        <p className="font-medium text-[#c00]">
                          {(product.price - product.discount).toLocaleString(
                            "vi-VN"
                          )}
                          ₫
                        </p>
                      ) : (
                        <p className="font-medium">
                          {product.price.toLocaleString("vi-VN")}₫
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchDesktop;
