"use client";
import Link from "next/link";
import Image from "./Image";
import React, { useEffect, useState } from "react";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import MenuSideCoupon from "./MenuSideCoupon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  changeItemQuantity,
  removeItemFromCart,
} from "@/redux/features/cartSlice";
import { ProductInCart } from "@/types/type";
import Loading from "./Loading";

function CartItem() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartSlice);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {}, [cart.productsInCart]);

  const handleIncrement = (item: ProductInCart) => {
    dispatch(
      changeItemQuantity({
        _id: item._id,
        sizeId: item.inventory.size._id,
        colorId: item.inventory.color._id,
        quantity: item.inventory.quantity + 1,
      })
    );
  };

  const handleDecrement = (item: ProductInCart) => {
    dispatch(
      changeItemQuantity({
        _id: item._id,
        sizeId: item.inventory.size._id,
        colorId: item.inventory.color._id,
        quantity: item.inventory.quantity - 1,
      })
    );
  };

  const handleRemove = (item: ProductInCart) => {
    dispatch(
      removeItemFromCart({
        _id: item._id,
        sizeId: item.inventory.size._id,
        colorId: item.inventory.color._id,
      })
    );
  };

  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <section className="max-w-[1230px] mx-auto mt-[40px] sm:mt-[45px]">
        <div className="px-[10px] sm:px-[15px]">
          <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
            Giỏ hàng
          </h2>
          {!isLoading ? (
            <Loading height={60} />
          ) : cart.productsInCart.length > 0 ? (
            <form action="">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white px-2.5 sm:px-4 border border-gray-300 rounded-md">
                  {cart.productsInCart.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="flex gap-4 bg-white py-6">
                        <div className="flex gap-4.5">
                          <Link href={`/product/${item.slug}`}>
                            <div className="w-full max-w-[150px] shrink-0">
                              <Image
                                Src={item.image[0]}
                                Alt={""}
                                ClassName={"w-full h-full object-cover"}
                                loadingType="eager"
                              />
                            </div>
                          </Link>

                          <div className="flex flex-col gap-4">
                            <div>
                              <Link
                                href={`/product/${item.slug}`}
                                className="text-[0.85rem] sm:text-[0.95rem] font-medium text-slate-900"
                              >
                                {item.name}
                              </Link>
                              <p className="text-[0.85rem] sm:text-[0.95rem]  font-medium text-[#898989] mt-2 flex items-center gap-2">
                                {item.inventory.size.namesize} /{" "}
                                {item.inventory.color.namecolor}
                              </p>
                            </div>

                            <div className="mt-auto flex items-center gap-1">
                              <button
                                type="button"
                                name="button-1"
                                onClick={() => handleDecrement(item)}
                                className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-slate-300 border"
                              >
                                <HiOutlineMinusSmall size={20} />
                              </button>
                              <span className="flex items-center justify-center  font-normal w-7 h-7 text-[1.1rem] leading-[18px]">
                                {item.inventory.quantity}
                              </span>
                              <button
                                type="button"
                                name="button-1"
                                onClick={() => handleIncrement(item)}
                                className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-slate-300 border"
                              >
                                <HiOutlinePlusSmall size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto flex flex-col">
                          <div className="flex gap-4 justify-end">
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4.5 h-4.5 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                                viewBox="0 0 64 64"
                              >
                                <path
                                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </button>

                            <button onClick={() => handleRemove(item)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
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
                          <h3 className="text-[1rem] font-normal text-slate-900 mt-auto">
                            {(
                              item.price * item.inventory.quantity
                            ).toLocaleString("vi-VN")}
                            ₫
                          </h3>
                        </div>
                      </div>

                      {cart.productsInCart.length % 2 === 0 && (
                        <hr className="border-gray-300" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="bg-[#F7F7F7] rounded-sm px-4 py-6 h-auto">
                  <div className="">
                    <div className="flex justify-between items-center mb-[5px]">
                      <label
                        htmlFor="discount"
                        className="block text-[1rem] font-semibold"
                      >
                        Mã giảm giá
                      </label>

                      <button
                        type="button"
                        className="underline text-[0.9rem]"
                        onClick={toggleOpen}
                      >
                        Xem tất cả
                      </button>
                    </div>

                    <div className="flex gap-[15px] items-center">
                      <input
                        type="text"
                        id="discount"
                        name="discount"
                        className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Nhập mã"
                      />

                      <button className="w-[120px] text-[0.9rem] rounded-md bg-[#197FB6] py-2 font-medium text-white">
                        Sử dụng
                      </button>
                    </div>
                  </div>

                  <hr className="border-gray-300 my-[20px]" />

                  <ul className="text-slate-900 font-medium space-y-4">
                    <li className="flex flex-wrap gap-4 text-[1.1rem] font-semibold">
                      Tổng cộng{" "}
                      <span className="ml-auto">
                        {cart.total.toLocaleString("vi-VN")}₫
                      </span>
                    </li>
                  </ul>

                  <hr className="border-gray-300 my-[20px]" />

                  <div className="space-y-[20px]">
                    <button
                      type="button"
                      className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-900 hover:bg-slate-700 text-white rounded-md"
                    >
                      Thanh toán
                    </button>

                    <Link
                      className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-200 text-slate-900 border border-gray-300 rounded-md text-center"
                      href={"/"}
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
                <div className="mb-[20px] flex justify-center">
                  <Image
                    Src={"/assets/other/empty-cart.png"}
                    Alt={""}
                    ClassName={"w-[190px]"}
                    loadingType="eager"
                  />
                </div>

                <div className="flex justify-center flex-col gap-3 items-center text-center">
                  <h2 className="text-[1.3rem] font-semibold">
                    Không có gì trong giỏ hết
                  </h2>

                  <Link
                    href={"/"}
                    className="text-[0.95rem] border border-black rounded-md font-medium px-2 py-2.5 hover:bg-black hover:text-white"
                  >
                    Mua sắm ngay
                  </Link>
                </div>
              </div>
            </div>
          )}

          <MenuSideCoupon toggleMenu={toggleOpen} isOpen={menuOpen} />
        </div>
      </section>
    </>
  );
}

export default CartItem;
