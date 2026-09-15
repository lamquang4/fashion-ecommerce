"use client";
import Link from "next/link";
import Image from "../ui/Image";
import { ProductInWishlist } from "@/types/type";

type WishlistItemProps = {
  item: ProductInWishlist;
  onRemove: () => void;
};

function WishlistItem({ item, onRemove }: WishlistItemProps) {
  return (
    <div className="relative flex w-full gap-4">
      <div className="flex w-full min-w-0 gap-4">
        <Link href={`/product/${item.slug}`} className="shrink-0">
          <div className="aspect-square w-[180px] overflow-hidden bg-gray-100">
            <Image
              src={item.variant.images[0]}
              alt={item.name}
              className="h-full w-full object-contain"
              loading="eager"
            />
          </div>
        </Link>

        <div className="flex w-full min-w-0 flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h5 className="line-clamp-2 font-medium capitalize">{item.name}</h5>

            <div className="flex items-center gap-2">
              <span className="truncate font-medium">
                Màu: {item.variant?.color?.namecolor}
              </span>

              <div
                style={{
                  backgroundColor: item.variant?.color?.codecolor,
                }}
                className="h-5.5 w-5.5 shrink-0 rounded-full border"
              />
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 duration-200 hover:scale-112"
            onClick={onRemove}
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
  );
}

export default WishlistItem;
