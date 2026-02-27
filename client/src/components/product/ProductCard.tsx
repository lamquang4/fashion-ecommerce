"use client";
import { Product, Variant } from "@/types/type";
import Link from "next/link";
import Image from "../ui/Image";
import { memo } from "react";

interface Props {
  product: Product;
  variant: Variant;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onSelectVariant: (productId: string, variant: Variant) => void;
}

function ProductCard({
  product,
  variant,
  isInWishlist,
  onToggleWishlist,
  onSelectVariant,
}: Props) {
  return (
    <>
      <div className="space-y-[15px]">
        <div className="relative group">
          <Link href={`/product/${product.slug}`}>
            <div className="w-full overflow-hidden pt-[100%] relative group">
              {variant.images[0] && (
                <Image
                  src={variant.images[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover z-1 group-hover:opacity-0"
                  loading="lazy"
                />
              )}
              {variant.images[1] && (
                <Image
                  src={variant.images[1]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 z-2"
                  loading="lazy"
                />
              )}
            </div>
          </Link>

          <div className="flex gap-2 flex-col absolute top-[12px] left-[12px] z-[3] font-semibold text-center  ">
            {product.discount > 0 && (
              <small className="uppercase text-[0.7rem] py-1 px-1.5 bg-white">
                Giảm giá {Math.floor((product.discount / product.price) * 100)}%
              </small>
            )}
          </div>

          <div className="absolute top-[12px] right-[10px] z-[3] font-semibold text-center  ">
            <button
              type="button"
              className="p-1 transition-colors duration-200 hover:scale-112  "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleWishlist();
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
                  onClick={() => onSelectVariant(product._id, variant1)}
                  type="button"
                  title={variant1.color?.namecolor}
                  className={`w-5.5 h-5.5 border-2 rounded-full ${
                    variant._id === variant1._id
                      ? "border-red-800"
                      : "border-gray-400"
                  }`}
                  style={{
                    backgroundColor: variant1.color?.codecolor,
                  }}
                ></button>
              );
            })}
          </div>

          <h5 className="line-clamp-2 font-medium capitalize">
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
                {(product.price - product.discount).toLocaleString("vi-VN")}₫
              </h5>
            </div>
          ) : (
            <h5 className="font-medium">
              {product.price.toLocaleString("vi-VN")}₫
            </h5>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(ProductCard);
