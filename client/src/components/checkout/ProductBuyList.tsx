"use client";
import { memo } from "react";
import Image from "../ui/Image";
import { ProductInCart } from "@/types/type";
import ProductBuyListSkeleton from "../skeleton/ProductBuyListSkeleton";

type Props = {
  productsInCart: ProductInCart[];
  isLoading: boolean;
};

function ProductBuyList({ productsInCart, isLoading = false }: Props) {
  return (
    <div className="space-y-[15px] bg-white">
      <h4>Đơn hàng</h4>

      {isLoading ? (
        <ProductBuyListSkeleton count={2} />
      ) : (
        productsInCart.map((item, index) => (
          <div className="flex rounded-lg bg-white gap-[15px]" key={index}>
            <div className="relative">
              <Image
                src={item.variant.images[0]}
                alt={item.name}
                className={"w-[120px] object-cover"}
                loading="eager"
              />

              <small className="text-[0.8rem] absolute flex items-center justify-center top-[-7px] right-[-9px] bg-[#197FB6] text-white font-medium rounded-full w-[25px] h-[25px]">
                {item.variant.quantity}
              </small>
            </div>

            <div className="flex w-full flex-col my-auto gap-[5px]">
              <span className="font-semibold">{item.name}</span>
              <span>
                {item.variant.size.namesize} / {item.variant.color.namecolor}
              </span>
              {item.discount > 0 ? (
                <div className="flex items-center gap-[8px] text-[0.9rem]">
                  <del className="text-[#707072]">
                    {item.price.toLocaleString("vi-VN")}₫
                  </del>
                  <p className="font-medium text-[#c00]">
                    {(item.price - item.discount).toLocaleString("vi-VN")}₫
                  </p>
                </div>
              ) : (
                <p className="font-medium">
                  {item.price.toLocaleString("vi-VN")}₫
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default memo(ProductBuyList);
