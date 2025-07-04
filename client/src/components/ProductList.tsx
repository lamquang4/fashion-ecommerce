"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import AdvancedSearch from "./AdvancedSearch";
import Image from "./Image";
import { notFound, useParams } from "next/navigation";
import useGetProductsSlug from "@/hooks/useGetProductsSlug";
import useGetCategory from "@/hooks/useGetCategory";
import Loading from "./Loading";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/features/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProductInWishlist } from "@/types/type";

function ProductList() {
  const params = useParams();
  const slug = params.slug as string;
  const { products, totalPages, totalItems, currentPage, limit, isLoading } =
    useGetProductsSlug(slug);
  const { category } = useGetCategory(slug);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleAdvancedSearch = () => {
    setAdvancedSearchOpen(!advancedSearchOpen);
  };

  if (products.length === 0 && !isLoading) {
    return notFound();
  }

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

  const wishlist = useSelector(
    (state: RootState) => state.wishlistSlice.productsInWishlist
  );

  const handleAddToWishlist = (product: ProductInWishlist) => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    };

    dispatch(addItemToWishlist(productToAdd));
  };

  const handleRemove = (product: ProductInWishlist) => {
    dispatch(
      removeItemFromWishlist({
        _id: product._id,
      })
    );
  };

  return (
    <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
        {isLoading ? (
          <Loading height={70} />
        ) : (
          products.length > 0 && (
            <>
              <div className="flex justify-between items-center flex-wrap my-[10px] mb-[35px]">
                <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550]">
                  {slug === "nam"
                    ? "Đồ nam"
                    : slug === "nu"
                    ? "Đồ nữ"
                    : `${category?.namecategory} ${
                        category?.gender === 1 ? "nam" : "nữ"
                      }`}{" "}
                  ({totalItems})
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
                className={`grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 ${
                  products.length <= 0 ? "h-[50vh]" : ""
                }`}
              >
                {products.map((product, index) => {
                  const isInWishlist = wishlist.some(
                    (item) => item._id === product._id
                  );
                  return (
                    <div key={index}>
                      <div className="relative group">
                        <Link href={`/product/${product.slug}`}>
                          <Image
                            Src={product.image[0]}
                            Alt={product.name}
                            ClassName={
                              "block w-full h-auto object-cover z-[1] relative"
                            }
                            loadingType="lazy"
                          />
                          {product.image.length > 1 && (
                            <Image
                              Src={product.image[1]}
                              Alt={product.name}
                              ClassName={
                                "block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                              }
                              loadingType="lazy"
                            />
                          )}
                        </Link>
                        {product.discount > 0 && (
                          <div className="absolute bottom-[10px] md:top-[10px] left-[10px] z-[3] font-semibold text-center text-black">
                            <p className="uppercase text-[0.75rem] p-1 bg-white w-[92px]">
                              Giảm giá{" "}
                              {Math.floor(
                                (product.discount / product.price) * 100
                              )}
                              %
                            </p>
                          </div>
                        )}

                        <div className="absolute top-[10px] right-[10px] z-[3] font-semibold text-center text-black">
                          <button
                            type="button"
                            className={`p-1 transition-colors duration-200 hover:scale-115 ${
                              isInWishlist
                                ? "text-black"
                                : "text-black hover:text-gray-500"
                            }`}
                            onClick={() => {
                              isInWishlist
                                ? handleRemove(product)
                                : handleAddToWishlist(product);
                            }}
                          >
                            <svg viewBox="0 0 256 256" width="22" height="22">
                              <rect fill="none" height="256" width="256" />
                              <path
                                d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                                stroke="currentColor"
                                strokeWidth="18"
                                fill={isInWishlist ? "currentColor" : "none"}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
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
                              {(
                                product.price - product.discount
                              ).toLocaleString("vi-VN")}
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
                  );
                })}
              </div>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                limit={limit}
                totalItems={totalItems}
              />
            </>
          )
        )}
      </div>
    </section>
  );
}

export default ProductList;
