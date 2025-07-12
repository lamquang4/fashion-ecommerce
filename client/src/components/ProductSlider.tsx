"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import Image from "./Image";
import { ProductInWishlist, Product } from "@/types/type";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/features/wishlistSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
interface Props {
  title: string;
  products: Product[];
}
function ProductSlider({ title, products }: Props) {
  const [selectedInventoryIndexes, setSelectedInventoryIndexes] = useState<{
    [productId: string]: number;
  }>({});
  const dispatch = useDispatch();
  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: { perView: 4, spacing: 12 },
    breakpoints: {
      "(max-width: 1640px)": {
        slides: { perView: 4, spacing: 12 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(max-width: 480px)": {
        slides: { perView: 2, spacing: 12 },
      },
    },
  });

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

  const handleRemove = (_id: string, variant: string) => {
    dispatch(
      removeItemFromWishlist({
        _id: _id,
        variantId: variant,
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
    <>
      {products.length > 0 && (
        <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
          <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
            <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
              {title}
            </h2>
            <div ref={sliderRef} className="keen-slider">
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
                  <div key={index} className="keen-slider__slide">
                    <div className="relative group">
                      <Link href={`/product/${product.slug}`}>
                        <picture>
                          <Image
                            Src={selectedInventory.images[0]}
                            Alt={""}
                            ClassName={
                              "block w-full h-auto object-cover z-[1] relative"
                            }
                            loadingType="lazy"
                          />
                          {selectedInventory.images[1] && (
                            <Image
                              Src={selectedInventory.images[1]}
                              Alt={""}
                              ClassName={
                                "block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                              }
                              loadingType="lazy"
                            />
                          )}
                        </picture>
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
                          className={`p-1 transition-colors duration-200 hover:scale-110 ${
                            isInWishlist
                              ? "text-red-500"
                              : "text-gray-500 hover:text-gray-600"
                          }`}
                          onClick={() => {
                            isInWishlist
                              ? handleRemove(product._id, selectedInventory._id)
                              : handleAddToWishlist(product, selectedIndex);
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
                            className="w-5.5 h-5.5 rounded-full border-gray-400 border"
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
          </div>
        </section>
      )}
    </>
  );
}

export default ProductSlider;
