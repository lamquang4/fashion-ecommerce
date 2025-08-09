"use client";
import Link from "next/link";
import Image from "./Image";
import Loading from "./Loading";
import React from "react";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
function WishlistItem() {
  const { wishlist, isLoading, mutate } = useGetWishlist();
  const { removeItem } = useRemoveItemWishlist();

  const handleRemoveItem = async (wishlistId: string, variant: string) => {
    await removeItem({
      wishlistId: wishlistId,
      variant: variant,
    });
    mutate();
  };
  return (
    <>
      <section className="max-w-[1230px] mx-auto  mt-[40px] sm:mt-[45px]">
        <div className=" px-[10px] sm:px-[15px]">
          <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
            Yêu thích ({wishlist?.productsInWishlist.length || 0})
          </h2>
          {isLoading ? (
            <Loading height={70} size={50} color="black" thickness={2} />
          ) : wishlist?.productsInWishlist &&
            wishlist?.productsInWishlist.length > 0 ? (
            <div className="flex gap-8 max-w-xl mx-auto w-full">
              <div className="basis-[100%]">
                {wishlist?.productsInWishlist.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex gap-4 bg-white py-5">
                      <div className="flex gap-4.5">
                        <Link href={`/product/${item.slug}`}>
                          <div className="w-full max-w-[200px] shrink-0">
                            <Image
                              Src={item.variant.images[0]}
                              Alt={""}
                              ClassName={"w-full h-full object-cover"}
                              loadingType="eager"
                            />
                          </div>
                        </Link>

                        <div className="flex flex-col gap-4">
                          <h2 className="text-[0.9rem] sm:text-[1.1rem] font-semibold text-black">
                            {item.name}
                          </h2>
                          <p className="text-[0.85rem] sm:text-[0.95rem] font-medium text-black">
                            Màu sắc: {item.variant.color.namecolor}
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col">
                        <div className="flex gap-4 justify-end">
                          <button
                            onClick={() =>
                              handleRemoveItem(
                                wishlist?._id || "",
                                item.variant._id
                              )
                            }
                            className="p-1 text-black duration-200 hover:scale-112"
                          >
                            <svg viewBox="0 0 256 256" width="22" height="22">
                              <rect fill="none" height="256" width="256" />
                              <path
                                d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                                stroke="currentColor"
                                strokeWidth="18"
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {wishlist.productsInWishlist.length % 2 === 0 && (
                      <hr className="border-gray-300" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[60vh]">
              <div>
                <div className="mb-[15px] flex justify-center">
                  <Image
                    Src={"/assets/other/empty-wishlist.png"}
                    Alt={""}
                    ClassName={"w-[170px]"}
                    loadingType="eager"
                  />
                </div>

                <div className="flex justify-center flex-col gap-3 items-center text-center">
                  <h2 className="text-[1.2rem] font-semibold">
                    Không có gì trong yêu thích hết
                  </h2>

                  <Link
                    href={"/collection/all"}
                    className="text-[0.95rem] border border-black rounded-md font-medium px-3 py-2 hover:bg-black hover:text-white"
                  >
                    Mua sắm ngay
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default WishlistItem;
