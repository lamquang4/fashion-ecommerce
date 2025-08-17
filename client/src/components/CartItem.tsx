"use client";
import Link from "next/link";
import Image from "./Image";
import React, { useMemo } from "react";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import useGetCart from "@/hooks/useGetCart";
import { useRemoveItemCart } from "@/hooks/useRemoveItemCart";
import { useChangeQuantityItemCart } from "@/hooks/useChangeQuantityItemCart";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CartItem() {
  const router = useRouter();

  const { cart, mutate } = useGetCart();
  const { data: session } = useSession();
  const { removeItem, isLoading: isLoadingRemoveItem } = useRemoveItemCart();
  const { changeQuantity, isLoading: isLoadingChangeQuantity } =
    useChangeQuantityItemCart();

  const totalQuantity = useMemo(() => {
    return (
      cart?.productsInCart.reduce((sum, item) => {
        return sum + (item?.variant?.quantity || 0);
      }, 0) || 0
    );
  }, [cart?.productsInCart]);

  const totalPrice = useMemo(() => {
    return (
      cart?.productsInCart.reduce((sum, item) => {
        const finalPrice =
          item.discount > 0 ? item.price - item.discount : item.price;

        return sum + finalPrice * item.variant.quantity;
      }, 0) || 0
    );
  }, [cart?.productsInCart]);

  // lấy những sản phẩm không đủ số lượng mua (số lượng mua > số lượng tồn kho)
  const outOfStockItems = useMemo(() => {
    if (!cart?.productsInCart) return [];
    return cart.productsInCart.filter(
      (item) => item.variant.quantity > item.variant.stock
    );
  }, [cart?.productsInCart]);

  const handleChangeQuantity = async (
    cartId: string,
    variant: string,
    size: string,
    quantity: number
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
    stock: number
  ) => {
    if (currentQuantity >= (stock > 15 ? 15 : stock)) return;

    handleChangeQuantity(cartId, variantId, sizeId, currentQuantity + 1);
  };

  const handleDecrement = (
    cartId: string,
    variantId: string,
    sizeId: string,
    currentQuantity: number
  ) => {
    if (currentQuantity <= 1) return;

    handleChangeQuantity(cartId, variantId, sizeId, currentQuantity - 1);
  };

  const handleRemoveItem = async (
    cartId: string,
    variant: string,
    size: string
  ) => {
    await removeItem({
      cartId: cartId,
      variant: variant,
      size: size,
    });
    mutate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Vui lòng đăng nhập");
      router.push(`/login`);
      return;
    }

    if (!cart?.productsInCart.length) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      router.push(`/collection/all`);
      return;
    }

    if (outOfStockItems.length > 0) {
      const errorMessage = outOfStockItems
        .map(
          (item) =>
            `Sản phẩm ${item.name} (${item.variant.size.namesize}, ${item.variant.color.namecolor}) chỉ còn ${item.variant.stock} sản phẩm. Không đủ tồn kho!`
        )
        .join("\n");
      toast.error(`${errorMessage}`);
      router.push(`/cart`);
      return;
    }

    router.push(`/checkout`);
  };

  return (
    <section className="max-w-[1230px] mx-auto my-[40px] sm:my-[45px]">
      <div className="px-[10px] sm:px-[15px]">
        <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[35px]">
          Giỏ hàng ({totalQuantity})
        </h2>
        {cart?.productsInCart && cart.productsInCart.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-8 w-full lg:flex-row flex-col">
              <div className="flex flex-col gap-8 bg-white basis-[70%]">
                {cart?.productsInCart.map((item) => (
                  <React.Fragment
                    key={`${item._id}-${item.variant._id}-${item.variant.color._id}-${item.variant.size._id}`}
                  >
                    <div className="flex w-full gap-4.5 relative">
                      <div className="flex gap-4.5 w-full">
                        <Link href={`/product/${item.slug}`}>
                          <div className="w-full max-w-[250px] shrink-0">
                            <Image
                              Src={item.variant.images[0]}
                              Alt={item.name}
                              ClassName={"w-full h-full object-cover"}
                              loadingType="eager"
                            />
                          </div>
                        </Link>

                        <div className="flex flex-col gap-4.5 w-full">
                          <div className="flex justify-between gap-4.5">
                            <div className="flex flex-col gap-2">
                              <h2 className="text-[0.9rem] sm:text-[1.1rem] font-semibold text-black">
                                {item.name}
                              </h2>
                              <p className="text-[0.85rem] sm:text-[0.95rem] font-medium text-black">
                                Màu sắc: {item.variant.color.namecolor}
                              </p>
                              <p className="text-[0.85rem] sm:text-[0.95rem] font-medium text-black">
                                Kích thước: {item.variant.size.namesize}
                              </p>
                              {item.discount > 0 ? (
                                <p className="text-[0.85rem] sm:text-[0.95rem] font-medium text-[#c00]">
                                  Giá giảm còn:{" "}
                                  {(item.price - item.discount).toLocaleString(
                                    "vi-VN"
                                  )}
                                  ₫
                                </p>
                              ) : (
                                <p className="text-[0.85rem] sm:text-[0.95rem] font-medium text-black">
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
                                  cart?._id || "",
                                  item.variant._id,
                                  item.variant.size._id
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

                          <div className="flex-wrap justify-between flex items-center gap-4.5 mt-auto">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                name="button-1"
                                onClick={() =>
                                  handleDecrement(
                                    cart?._id || "",
                                    item.variant._id,
                                    item.variant.size._id,
                                    item.variant.quantity
                                  )
                                }
                                disabled={
                                  item.variant.quantity <= 1 ||
                                  isLoadingChangeQuantity
                                }
                                className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-slate-300 border"
                              >
                                <HiOutlineMinusSmall size={20} />
                              </button>
                              <span className="flex items-center justify-center  font-normal w-7 h-7 text-[1.1rem] leading-[18px]">
                                {item.variant.quantity}
                              </span>
                              <button
                                type="button"
                                name="button-1"
                                onClick={() =>
                                  handleIncrement(
                                    cart?._id || "",
                                    item.variant._id,
                                    item.variant.size._id,
                                    item.variant.quantity,
                                    item.variant.stock
                                  )
                                }
                                disabled={
                                  item.variant.quantity >=
                                    (item.variant.stock < 15
                                      ? item.variant.stock
                                      : 15) || isLoadingChangeQuantity
                                }
                                className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-slate-300 border"
                              >
                                <HiOutlinePlusSmall size={20} />
                              </button>
                            </div>

                            <h3 className="text-[1rem] font-medium text-black ">
                              Tổng:{" "}
                              {item.discount > 0
                                ? (
                                    (item.price - item.discount) *
                                    item.variant.quantity
                                  ).toLocaleString("vi-VN") + "₫"
                                : (
                                    item.price * item.variant.quantity
                                  ).toLocaleString("vi-VN") + "₫"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {item.variant.stock < item.variant.quantity && (
                      <div className="my-1">
                        <p className="text-[0.95rem] text-red-500 font-semibold text-center">
                          Sản phẩm hiện tại không đủ số lượng. Vui lòng giảm số
                          lượng hoặc xóa sản phẩm khỏi giỏ hàng
                        </p>
                      </div>
                    )}

                    {cart.productsInCart.length % 2 === 0 && (
                      <hr className="border-gray-300" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="bg-[#F7F7F7] rounded-sm px-4 py-6 h-auto basis-[30%]">
                <ul className="text-slate-900 font-medium space-y-4">
                  <li className="flex flex-wrap gap-4 text-[1.1rem] font-semibold uppercase">
                    Tổng cộng{" "}
                    <span className="ml-auto">
                      {totalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </li>
                </ul>

                <hr className="border-gray-300 my-[20px]" />

                <div className="space-y-[20px]">
                  <button
                    type="submit"
                    className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-900 hover:bg-slate-700 text-white rounded-md"
                  >
                    Thanh toán
                  </button>

                  <Link
                    className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-200 text-slate-900 border border-gray-300 rounded-md text-center"
                    href={"/collection/all"}
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div>
              <div className="mb-[15px] flex justify-center">
                <Image
                  Src={"/assets/other/empty-cart.png"}
                  Alt={""}
                  ClassName={"w-[150px]"}
                  loadingType="eager"
                />
              </div>

              <div className="flex justify-center flex-col gap-3 items-center text-center">
                <h2 className="text-[1.2rem] font-semibold">
                  Không có gì trong giỏ hết
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
  );
}

export default CartItem;
