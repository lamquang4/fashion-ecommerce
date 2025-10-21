"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import Link from "next/link";
import Image from "../Image";
import { useMemo, useState } from "react";
import { Product, Variant } from "@/types/type";
import useAddWishlist from "@/hooks/useAddWishlist";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";

interface Props {
  title: string;
  products: Product[];
}
function ProductSlider({ title, products }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, Variant>
  >({});

  const { wishlist, mutate } = useGetWishlist();
  const { addWishlist } = useAddWishlist();
  const { removeItem } = useRemoveItemWishlist();

  const handleSelectVariant = (productId: string, variant: Variant) => {
    setSelectedVariant((prev) => ({
      ...prev,
      [productId]: variant,
    }));
  };

  const wishlistVariantId = useMemo(() => {
    return new Set(
      wishlist?.productsInWishlist.map((item: any) => item.variant._id)
    );
  }, [wishlist?.productsInWishlist]);

  const handleAddToWishlist = async (variant: Variant) => {
    await addWishlist({ variant: variant._id });
    mutate();
  };

  const handleRemove = async (variant: Variant) => {
    await removeItem({
      wishlistId: wishlist?._id || "",
      variant: variant._id,
    });
    mutate();
  };

  return (
    <>
      {products.length > 0 && (
        <section className="mb-[40px] px-[15px]">
          <div className="mx-auto max-w-[1230px] w-full">
            <h2 className="mb-[20px]">{title}</h2>
            <Swiper
              spaceBetween={12}
              modules={[FreeMode]}
              freeMode={true}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1640: {
                  slidesPerView: 4,
                },
              }}
            >
              {products.map((product) => {
                const variant =
                  selectedVariant[product._id] ?? product.variants[0];
                const isInWishlist = wishlistVariantId.has(variant._id);
                return (
                  <SwiperSlide key={product._id}>
                    <div className="relative group">
                      <Link href={`/product/${product.slug}`}>
                        {variant.images[0] && (
                          <Image
                            Src={variant.images[0]}
                            Alt={product.name}
                            ClassName={"w-full z-[1] relative"}
                            loadingType="lazy"
                          />
                        )}
                        {variant.images[1] && (
                          <Image
                            Src={variant.images[1]}
                            Alt={product.name}
                            ClassName={
                              "w-full absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                            }
                            loadingType="lazy"
                          />
                        )}
                      </Link>

                      <div className="flex gap-2 flex-col absolute top-[12px] left-[12px] z-[3] font-semibold text-center  ">
                        {product.discount > 0 && (
                          <small className="uppercase text-[0.7rem] py-1 px-1.5 bg-white">
                            Giảm giá{" "}
                            {Math.floor(
                              (product.discount / product.price) * 100
                            )}
                            %
                          </small>
                        )}
                      </div>

                      <div className="absolute top-[12px] right-[10px] z-[3] font-semibold text-center  ">
                        <button
                          type="button"
                          className="p-1 transition-colors duration-200 hover:scale-112  "
                          onClick={() => {
                            isInWishlist
                              ? handleRemove(variant)
                              : handleAddToWishlist(variant);
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
                    <div className="py-[12px] space-y-[6px]">
                      <div className="flex space-x-2 mb-[10px]">
                        {product.variants.map((variant1, index) => {
                          return (
                            <button
                              key={index}
                              onClick={() =>
                                handleSelectVariant(product._id, variant1)
                              }
                              type="button"
                              title={variant.color?.namecolor}
                              className={`w-5.5 h-5.5 border-gray-400 border rounded-full focus:ring-1 focus:ring-offset-2 ring-red-800 ${
                                variant._id === variant1._id
                                  ? "ring-1 ring-offset-2"
                                  : ""
                              }`}
                              style={{
                                backgroundColor: variant1.color?.codecolor,
                              }}
                            ></button>
                          );
                        })}
                      </div>

                      <h5 className="  font-medium capitalize">
                        {product.name}
                      </h5>

                      <p className="font-medium text-[#444]">
                        {product.category.namecategory} /{" "}
                        {product.category.gender === 1
                          ? "Nam"
                          : product.category.gender === 0
                          ? "Nữ"
                          : ""}
                      </p>

                      {product.discount > 0 ? (
                        <div className="flex gap-[12px]  ">
                          <del className="text-[#707072] text-[1rem]">
                            {product.price.toLocaleString("vi-VN")}₫
                          </del>

                          <h5 className="font-medium text-[#c00]">
                            {(product.price - product.discount).toLocaleString(
                              "vi-VN"
                            )}
                            ₫
                          </h5>
                        </div>
                      ) : (
                        <h5 className="font-medium">
                          {product.price.toLocaleString("vi-VN")}₫
                        </h5>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductSlider;
