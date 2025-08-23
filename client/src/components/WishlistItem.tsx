"use client";
import Link from "next/link";
import Image from "./Image";
import React from "react";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
function WishlistItem() {
  const { wishlist, mutate } = useGetWishlist();
  const { removeItem } = useRemoveItemWishlist();

  const handleRemoveItem = async (wishlistId: string, variant: string) => {
    await removeItem({
      wishlistId: wishlistId,
      variant: variant,
    });
    mutate();
  };
  return (
    <section className="max-w-[1230px] mx-auto my-[40px]">
      <div className=" px-[10px] sm:px-[15px]">
        <h2 className="mb-[20px]">
          Yêu thích ({wishlist?.productsInWishlist.length})
        </h2>
        {wishlist?.productsInWishlist &&
        wishlist?.productsInWishlist.length > 0 ? (
          <div className="flex gap-8 lg:max-w-xl mx-auto w-full">
            <div className="flex flex-col gap-5 bg-white basis-full">
              {wishlist?.productsInWishlist.map((item) => (
                <React.Fragment
                  key={`${item._id}-${item.variant._id}-${item.variant.color._id}`}
                >
                  <div className="flex w-full gap-4 relative">
                    <div className="flex gap-4.5 w-full">
                      <Link href={`/product/${item.slug}`}>
                        <div className="w-full max-w-[270px] shrink-0">
                          <Image
                            Src={item.variant.images[0]}
                            Alt={""}
                            ClassName={"w-full h-full object-cover"}
                            loadingType="eager"
                          />
                        </div>
                      </Link>

                      <div className="flex justify-between gap-4 w-full">
                        <div className="flex flex-col gap-2">
                          <h5 className="text-black">{item.name}</h5>
                          <p className="font-medium text-black">
                            Màu: {item.variant.color.namecolor}
                          </p>
                        </div>

                        <button
                          className="mb-auto text-black duration-200 hover:scale-112"
                          onClick={() =>
                            handleRemoveItem(
                              wishlist?._id || "",
                              item.variant._id
                            )
                          }
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
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <Image
                Src={"/assets/other/empty-wishlist.png"}
                Alt={""}
                ClassName={"w-[170px]"}
                loadingType="eager"
              />

              <h4 className="text-gray-600">Không có gì trong yêu thích hết</h4>

              <Link
                href={"/collection/all"}
                className="text-[0.9rem] border border-black rounded-md font-medium px-3 py-2 hover:bg-black hover:text-white"
              >
                Mua sắm ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default WishlistItem;
