"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import AdvancedSearch from "./AdvancedSearch";
import Image from "./Image";
import { useParams } from "next/navigation";
import useGetProductsSlug from "@/hooks/useGetProductsSlug";
function ProductList() {
  const params = useParams();
  const slug = params.slug as string;
  const { products, totalPages, totalItems, currentPage, limit } =
    useGetProductsSlug(slug);

  console.log(products);

  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const toggleAdvancedSearch = () => {
    setAdvancedSearchOpen(!advancedSearchOpen);
  };

  useEffect(() => {
    if (advancedSearchOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [advancedSearchOpen]);

  return (
    <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
        <div className="flex justify-between items-center flex-wrap my-[10px] mb-[35px]">
          <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550]">
            Tất cả ({totalItems})
          </h2>
          <button
            className="px-2 py-2 border border-black text-[0.85rem] text-black"
            onClick={toggleAdvancedSearch}
          >
            Bộ lọc & Sắp xếp
          </button>
        </div>

        <AdvancedSearch
          isOpen={advancedSearchOpen}
          toggleMenu={toggleAdvancedSearch}
        />

        <div
          className="grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2"
          style={{ display: products.length === 0 ? "flex" : "grid" }}
        >
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index}>
                <div className="relative group">
                  <Link href={"/product"}>
                    <Image
                      Src={product.image[0]}
                      Alt={product.name}
                      ClassName={
                        "block w-full h-auto object-cover z-[1] relative"
                      }
                      loadingType="lazy"
                    />
                    <Image
                      Src={product.image[1]}
                      Alt={product.name}
                      ClassName={
                        "block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                      }
                      loadingType="lazy"
                    />
                  </Link>
                  {product.discount > 0 && (
                    <div className="absolute bottom-[10px] md:top-[10px] left-[10px] z-[3] font-semibold text-center text-black">
                      <p className="uppercase text-[0.75rem] px-[5px] py-[5px] bg-white w-[90px]">
                        Giảm giá{" "}
                        {Math.floor((product.discount / product.price) * 100)}%
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-[14px_2px]">
                  <h2 className="text-[#969696] text-[0.9rem] sm:text-[0.95rem] font-medium uppercase mb-[6px]">
                    {product.category.namecategory} /{" "}
                    {product.category.gender === 1 ? "Nam" : "Nữ"}
                  </h2>
                  <h2 className="text-black text-[0.9rem] sm:text-[0.95rem] font-medium capitalize mb-[6px]">
                    {product.name}
                  </h2>
                  <div className="flex gap-[10px] text-[0.95rem] sm:text-[1rem] text-black mb-[8px]">
                    {product.discount > 0 && (
                      <del className="text-[#707072]">
                        {product.price.toLocaleString("vi-VN")}₫
                      </del>
                    )}
                    {product.discount > 0 ? (
                      <p className="font-medium">
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

                  {product.colors?.length > 0 && (
                    <div className="flex space-x-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          type="button"
                          title={color?.namecolor}
                          className="w-6 h-6 border-gray-500 border"
                          style={{ backgroundColor: color?.codecolor }}
                        ></button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="h-[55vh] w-full flex items-center justify-center">
              <Image
                Src={"/assets/other/notfound1.png"}
                Alt={""}
                ClassName={"md:w-[190px] w-[170px]"}
                loadingType="eager"
              />
            </div>
          )}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          limit={limit}
          totalItems={totalItems}
        />
      </div>
    </section>
  );
}

export default ProductList;
