"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AdvancedSearch from "./AdvancedSearch";
import Image from "./Image";
import Loading from "./Loading";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/features/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Category, ProductWithColors, ProductInWishlist } from "@/types/type";
import { useParams, useSearchParams } from "next/navigation";
interface Props {
  category?: Category;
  products: ProductWithColors[];
  isLoading: boolean;
  totalItems: number;
}
function ProductList({ category, products, isLoading, totalItems }: Props) {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useDispatch();
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("q");

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
        ) : products.length > 0 ? (
          <>
            <div className="flex justify-between items-center flex-wrap my-[10px] mb-[35px]">
              <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550]">
                {!search && slug === "nam"
                  ? "Đồ nam"
                  : slug === "nu"
                  ? "Đồ nữ"
                  : category &&
                    `${category?.namecategory} ${
                      category?.gender === 1 ? "nam" : "nữ"
                    }`}{" "}
                {!category && !slug && search && search} ({totalItems})
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
                          className={`p-1 transition-colors duration-200 hover:scale-110 ${
                            isInWishlist
                              ? "text-red-500"
                              : "text-gray-500 hover:text-gray-600"
                          }`}
                          onClick={() => {
                            isInWishlist
                              ? handleRemove(product)
                              : handleAddToWishlist(product);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-bookmark-heart"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
                            />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
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
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div>
              <div className="mb-[20px] flex justify-center">
                <Image
                  Src={"/assets/other/notfound1.png"}
                  Alt={""}
                  ClassName={"w-[180px]"}
                  loadingType="eager"
                />
              </div>

              <div className="flex justify-center flex-col gap-3 items-center text-center">
                <h2 className="text-[1.2rem] font-semibold">
                  Không tìm thấy sản phẩm nào
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
