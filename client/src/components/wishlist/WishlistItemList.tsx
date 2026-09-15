"use client";
import Link from "next/link";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
import WishlistItemListSkeleton from "../skeleton/WishlistItemListSkeleton";
import Image from "../ui/Image";
import WishlistItem from "./WishlistItem";

function WishlistItemList() {
  const { wishlist, isLoading, mutate } = useGetWishlist();
  const { removeItem } = useRemoveItemWishlist();

  const handleRemoveItem = async (wishlistId: string, variant: string) => {
    await removeItem({
      wishlistId: wishlistId,
      variant: variant,
    });

    mutate(
      (prevCart) => ({
        ...prevCart!,
        productsInWishlist: prevCart!.productsInWishlist.filter(
          (item) => !(item.variant._id === variant),
        ),
      }),
      false,
    );
  };
  return (
    <section className="my-[40px] px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <h2 className="mb-[20px]">
          Yêu thích ({wishlist?.productsInWishlist.length || 0})
        </h2>

        {isLoading ? (
          <WishlistItemListSkeleton count={4} />
        ) : wishlist?.productsInWishlist &&
          wishlist?.productsInWishlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 bg-white lg:grid-cols-2">
            {wishlist.productsInWishlist.map((item) => (
              <WishlistItem
                key={`${item._id}-${item.variant._id}-${item.variant.color._id}`}
                item={item}
                onRemove={() =>
                  handleRemoveItem(wishlist?._id || "", item.variant._id)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <Image
                src={"/assets/empty-wishlist.png"}
                alt={""}
                className={"w-[170px]"}
                loading="eager"
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

export default WishlistItemList;
