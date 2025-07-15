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
import { Category, Product, ProductInWishlist } from "@/types/type";
import { useParams, useSearchParams } from "next/navigation";
interface Props {
  category?: Category;
  products: Product[];
  isLoading: boolean;
  totalItems: number;
}
function ProductList({ category, products, isLoading, totalItems }: Props) {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useDispatch();
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [selectedInventoryIndexes, setSelectedInventoryIndexes] = useState<{
    [productId: string]: number;
  }>({});
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

  const handleAddToWishlist = (product: Product, inventoryIndex: number) => {
    const variant = product.variants[inventoryIndex];

    const productToAdd: ProductInWishlist = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      variant: {
        _id: variant._id,
        images: variant.images,
        color: {
          _id: variant.color._id,
          namecolor: variant.color.namecolor,
          codecolor: variant.color.codecolor,
        },
      },
    };

    dispatch(addItemToWishlist(productToAdd));
  };

  const handleRemove = (_id: string, variantId: string) => {
    dispatch(
      removeItemFromWishlist({
        _id: _id,
        variantId: variantId,
      })
    );
  };

  function checkNewProduct(createdAt: string): boolean {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const checkDays =
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    return checkDays <= 14;
  }

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
                {!category && !slug && search && search}
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
                const selectedIndex =
                  selectedInventoryIndexes[product._id] || 0;
                const selectedInventory = product.variants[selectedIndex];

                const isInWishlist = wishlist.some(
                  (item) =>
                    item._id === product._id &&
                    item.variant._id === selectedInventory._id
                );

                return (
                  <div key={index}>
                    <div className="relative group">
                      <Link href={`/product/${product.slug}`}>
                        <Image
                          Src={selectedInventory.images[0]}
                          Alt={product.name}
                          ClassName={
                            "block w-full h-auto object-cover z-[1] relative"
                          }
                          loadingType="eager"
                        />
                        {selectedInventory.images[1] && (
                          <Image
                            Src={selectedInventory.images[1]}
                            Alt={product.name}
                            ClassName={
                              "block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                            }
                            loadingType="eager"
                          />
                        )}
                      </Link>
                      {product.discount > 0 && (
                        <div className="flex gap-2 flex-col absolute top-[10px] left-[10px] z-[3] font-semibold text-center text-black">
                          <p className="uppercase text-[0.75rem] py-1 px-1.5 bg-white">
                            Giảm giá{" "}
                            {Math.floor(
                              (product.discount / product.price) * 100
                            )}
                            %
                          </p>

                          {product.createdAt &&
                            checkNewProduct(product.createdAt) && (
                              <p className="uppercase text-[0.75rem] py-1 px-1.5 bg-white">
                                Hàng mới
                              </p>
                            )}
                        </div>
                      )}

                      <div className="absolute top-[12px] right-[10px] z-[3] font-semibold text-center text-black">
                        <button
                          type="button"
                          className={`p-1 transition-colors duration-200 hover:scale-112 ${
                            isInWishlist
                              ? "text-black"
                              : "text-gray-500 hover:text-gray-600"
                          }`}
                          onClick={() => {
                            isInWishlist
                              ? handleRemove(product._id, selectedInventory._id)
                              : handleAddToWishlist(product, selectedIndex);
                          }}
                        >
                          <svg viewBox="0 0 256 256" width="22" height="22">
                            <rect fill="none" height="256" width="256" />
                            <path
                              d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                              stroke="currentColor"
                              strokeWidth="16"
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

                      <div className="flex space-x-2">
                        {product.variants.map((variant, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setSelectedInventoryIndexes((prev) => ({
                                ...prev,
                                [product._id]: product.variants.findIndex(
                                  (i) => i.color?._id === variant.color?._id
                                ),
                              }))
                            }
                            type="button"
                            title={variant.color?.namecolor}
                            className="w-5.5 h-5.5 border-gray-400 border rounded-full"
                            style={{
                              backgroundColor: variant.color?.codecolor,
                            }}
                          ></button>
                        ))}
                      </div>
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
