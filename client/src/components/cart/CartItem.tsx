"use client";
import { useChangeQuantityItemCart } from "@/hooks/useChangeQuantityItemCart";
import Image from "../Image";
import { ProductInCart } from "@/types/type";
import Link from "next/link";
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";
import { useRemoveItemCart } from "@/hooks/useRemoveItemCart";
import useGetCart from "@/hooks/useGetCart";
import toast from "react-hot-toast";
import { memo } from "react";

type Props = {
  cartId: string;
  item: ProductInCart;
};

function CartItem({ cartId, item }: Props) {
  const max = 15;
  const { mutate } = useGetCart();
  const { removeItem, isLoading: isLoadingRemoveItem } = useRemoveItemCart();
  const { changeQuantity, isLoading: isLoadingChangeQuantity } =
    useChangeQuantityItemCart();

  const handleChangeQuantity = async (
    cartId: string,
    variant: string,
    size: string,
    quantity: number,
  ) => {
    await changeQuantity({
      cartId: cartId,
      variant: variant,
      size: size,
      quantity: quantity,
    });
    mutate();
  };

  const handleIncrement = (
    cartId: string,
    variantId: string,
    sizeId: string,
    currentQuantity: number,
    stock: number,
  ) => {
    const limit = stock > max ? max : stock; // số lượng tối đa có thể mua

    if (currentQuantity >= limit) {
      toast.error("Số lượng tồn kho cho sản phẩm này là " + limit);
      return;
    }
    handleChangeQuantity(cartId, variantId, sizeId, currentQuantity + 1);
  };

  const handleDecrement = (
    cartId: string,
    variantId: string,
    sizeId: string,
    currentQuantity: number,
  ) => {
    if (currentQuantity <= 1) return;

    handleChangeQuantity(cartId, variantId, sizeId, currentQuantity - 1);
  };

  const handleRemoveItem = async (
    cartId: string,
    variant: string,
    size: string,
  ) => {
    await removeItem({
      cartId: cartId,
      variant: variant,
      size: size,
    });

    mutate(
      (prevCart) => ({
        ...prevCart!,
        productsInCart: prevCart!.productsInCart.filter(
          (item) =>
            !(item.variant._id === variant && item.variant.size._id === size),
        ),
      }),
      false,
    );
  };
  return (
    <div
      className="w-full relative space-y-4"
      key={`${item._id}-${item.variant._id}-${item.variant.color._id}-${item.variant.size._id}`}
    >
      <div className="flex gap-4 w-full">
        <Link href={`/product/${item.slug}`}>
          <div className="w-full max-w-[250px] shrink-0">
            <Image
              Src={item.variant.images[0]}
              Alt={item.name}
              ClassName={"w-full"}
              loadingType="eager"
            />
          </div>
        </Link>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h5 className=" ">{item.name}</h5>
              <p className="font-medium  ">
                Màu: {item.variant.color.namecolor}
              </p>
              <p className="font-medium  ">
                Kích thước: {item.variant.size.namesize}
              </p>
              {item.discount > 0 ? (
                <p className="font-medium text-[#c00]">
                  Giá giảm:{" "}
                  {(item.price - item.discount).toLocaleString("vi-VN")}₫
                </p>
              ) : (
                <p className="font-medium  ">
                  Giá: {item.price.toLocaleString("vi-VN")}₫
                </p>
              )}
            </div>

            <button
              type="button"
              className="mb-auto"
              disabled={isLoadingRemoveItem}
              onClick={() =>
                handleRemoveItem(
                  cartId || "",
                  item.variant._id,
                  item.variant.size._id,
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer fill-black hover:fill-red-600 inline-block"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex-wrap justify-between flex items-center gap-4 mt-auto">
            <div className="flex items-center gap-1">
              <button
                type="button"
                name="button-1"
                onClick={() =>
                  handleDecrement(
                    cartId || "",
                    item.variant._id,
                    item.variant.size._id,
                    item.variant.quantity,
                  )
                }
                disabled={item.variant.quantity <= 1 || isLoadingChangeQuantity}
                className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-gray-300 border"
              >
                <HiOutlineMinusSmall size={20} />
              </button>
              <h5 className="flex items-center justify-center w-7 h-7">
                {item.variant.quantity}
              </h5>
              <button
                type="button"
                name="button-1"
                onClick={() =>
                  handleIncrement(
                    cartId || "",
                    item.variant._id,
                    item.variant.size._id,
                    item.variant.quantity,
                    item.variant.stock,
                  )
                }
                disabled={
                  item.variant.quantity >=
                    (item.variant.stock < max ? item.variant.stock : max) ||
                  isLoadingChangeQuantity
                }
                className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-gray-300 border"
              >
                <HiOutlinePlusSmall size={20} />
              </button>
            </div>

            <h5 className="font-medium">
              Tổng:{" "}
              {item.discount > 0
                ? (
                    (item.price - item.discount) *
                    item.variant.quantity
                  ).toLocaleString("vi-VN") + "₫"
                : (item.price * item.variant.quantity).toLocaleString("vi-VN") +
                  "₫"}
            </h5>
          </div>
        </div>
      </div>

      {item.variant.stock < item.variant.quantity && (
        <div>
          <p className="text-red-500 font-semibold">
            Sản phẩm hiện tại không đủ số lượng. Vui lòng giảm số lượng hoặc xóa
            sản phẩm khỏi giỏ hàng
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(CartItem);
