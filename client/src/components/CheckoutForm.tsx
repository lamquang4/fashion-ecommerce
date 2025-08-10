"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "./Image";
import MenuSideCoupon from "./MenuSideCoupon";
import useGetProvinces from "@/hooks/useGetProvinceVN";
import useGetCart from "@/hooks/useGetCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useGetAddresses from "@/hooks/useGetAddresses";
import { Address } from "@/types/type";
import useAddOrder from "@/hooks/useAddOrder";
import toast from "react-hot-toast";
import useGetCoupon from "@/hooks/useGetCoupon";
import usePaymentMomo from "@/hooks/usePaymentMomo";
import useStatusMomo from "@/hooks/useStatusMomo";
import useDeleteCart from "@/hooks/useDeleteCart";
import Loading from "./Loading";

function CheckoutForm() {
  const { provinces } = useGetProvinces();
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    speaddress: "",
  });
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [paymethod, setPaymethod] = useState<number>();
  const { cart, mutate: mutateCart, isLoading: isLoadingCart } = useGetCart();
  const { status } = useSession();
  const { addresses, isLoading: isLoadingAddresses } = useGetAddresses();
  const { addOrder, isLoading: isLoadingAddOrder } = useAddOrder();
  const { deleteCart, isLoading: isLoadingDeleteCart } = useDeleteCart();
  const { createPaymentMomo } = usePaymentMomo();
  const { checkPaymentStatusMomo, isLoading: isLoadingCheckPaymentStatusMomo } =
    useStatusMomo();
  const router = useRouter();

  const totalPrice =
    cart?.productsInCart.reduce((sum, item) => {
      const finalPrice =
        item.discount > 0 ? item.price - item.discount : item.price;

      return sum + finalPrice * item.variant.quantity;
    }, 0) || 0;

  const {
    coupon,
    error,
    getCoupon,
    mutate,
    isLoading: isLoadingCoupon,
  } = useGetCoupon();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetAddress = (address: Address | null) => {
    if (address) {
      setData({
        fullname: address.fullname,
        phone: address.phone,
        speaddress: address.speaddress,
      });
      setSelectedProvinceName(address.city);
      setSelectedWard(address.ward);
    } else {
      setData({
        fullname: "",
        phone: "",
        speaddress: "",
      });
      setSelectedProvinceName("");
      setSelectedWard("");
    }
  };

  useEffect(() => {
    if (isLoadingCart || isLoadingAddresses || status === "loading") return;

    // kiểm tra đăng nhập chưa
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    // kiểm tra giỏ hàng
    if (!cart || !cart.productsInCart?.length) {
      router.replace("/cart");
      return;
    }

    // kiểm tra tài khoản đã có địa chỉ chưa
    if (!addresses || !addresses.length) {
      router.replace("/address");
      return;
    }

    const outOfStockItems = cart?.productsInCart.filter(
      (item) => item.variant.quantity > item.variant.stock
    );

    // kiểm tra tồn kho sản phẩm
    if (outOfStockItems.length > 0) {
      const errorMessage = outOfStockItems
        .map(
          (item) =>
            `Sản phẩm ${item.name} (${item.variant.size.namesize}, ${item.variant.color.namecolor}) chỉ còn ${item.variant.stock} đơn vị.`
        )
        .join("\n");
      toast.error(`Không đủ tồn kho:\n${errorMessage}`);
      router.replace(`/cart`);
      return;
    }
  }, [cart, addresses, router, isLoadingCart, isLoadingAddresses, status]);

  // tạo đơn hàng khi thanh toán Momo thành công
  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    const checkoutData = localStorage.getItem("checkoutData");

    const handleOrderMomoPayment = async () => {
      if (!orderId || !checkoutData) return;

      const res = await checkPaymentStatusMomo(orderId);

      if (res.resultCode !== 0) {
        return;
      }

      const {
        fullname,
        phone,
        speaddress,
        city,
        ward,
        paymethod,
        productsBuy,
        total,
        coupon,
      } = JSON.parse(checkoutData);

      await addOrder({
        fullname,
        phone,
        speaddress,
        city,
        ward,
        paymethod,
        productsBuy,
        total,
        coupon,
      });

      toast.success(`Đặt hàng thành công!`);
      router.replace("/");

      localStorage.removeItem("checkoutData");
      localStorage.removeItem("orderId");
      await deleteCart();
      mutateCart();
    };

    handleOrderMomoPayment();
  }, []);

  const selectedProvince = provinces?.find(
    (province) => province.province === selectedProvinceName
  );

  let finalTotal = totalPrice;

  if (coupon) {
    if (coupon.discountType === 1) {
      finalTotal -= coupon.discountValue;
    } else if (coupon.discountType === 0) {
      const discount = Math.min(
        (totalPrice * coupon.discountValue) / 100,
        coupon.maxDiscountValue!
      );
      finalTotal -= discount;
    }
  }

  finalTotal = Math.max(0, finalTotal);

  const handleCoupon = () => {
    if (!couponCode) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }

    getCoupon(couponCode.trim(), totalPrice);

    mutate();

    if (error && !isLoadingCoupon) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymethod === undefined) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    if (paymethod === 1 && finalTotal === 0) {
      toast.error(
        "Vui lòng chọn thanh toán COD vì đơn hàng có tổng tiền bằng 0"
      );
      return;
    }

    const items = cart?.productsInCart.map((item) => {
      return {
        product: item._id,
        size: item.variant.size._id,
        color: item.variant.color._id,
        quantity: item.variant.quantity,
        price: item.price,
        discount: item.discount,
      };
    });

    if (paymethod === 1) {
      const momoResponse = await createPaymentMomo({
        total: finalTotal,
        paymethod,
      });

      localStorage.setItem("orderId", momoResponse.orderId);

      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          fullname: data.fullname,
          phone: data.phone,
          speaddress: data.speaddress,
          city: selectedProvinceName,
          ward: selectedWard,
          paymethod,
          productsBuy: items,
          total: finalTotal,
          coupon: coupon?._id,
        })
      );

      window.location.href = momoResponse.payUrl;

      return;
    } else {
      await addOrder({
        fullname: data.fullname,
        phone: data.phone,
        speaddress: data.speaddress,
        city: selectedProvinceName,
        ward: selectedWard,
        paymethod: paymethod!,
        productsBuy: items!,
        total: finalTotal,
        coupon: coupon?._id,
      });

      toast.success(`Đặt hàng thành công!`);
      router.replace("/");

      await deleteCart();
      mutateCart();
    }
  };

  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <section className="max-w-6xl mx-auto my-[40px] sm:my-[45px] relative">
        <div className="w-full px-[10px] sm:px-[15px]">
          <Link href={"/"}>
            <Image
              Src={"/assets/other/logo.png"}
              Alt={""}
              ClassName={"w-[80px]"}
              loadingType="eager"
            />
          </Link>

          <hr className="border-slate-300 my-[15px]" />

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-[50px]">
              <div className=" bg-gray-50 order-last lg:order-first">
                <p className="text-xl font-medium mb-[15px]">
                  Thông tin giao hàng
                </p>

                <div className="">
                  <div className="mb-[15px]">
                    <label
                      htmlFor=""
                      className="mt-4 mb-2 block text-[0.9rem] font-medium"
                    >
                      Địa chỉ lưu trữ
                    </label>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          handleGetAddress(null);
                        } else {
                          const selected = addresses.find(
                            (addr) => addr._id === value
                          );
                          if (selected) handleGetAddress(selected);
                        }
                      }}
                      className="w-full rounded-md text-[0.9rem] border border-gray-200 px-2.5 py-2 outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Chọn địa chỉ lưu trữ</option>
                      {addresses.map((address, index) => (
                        <option value={address._id} key={index}>
                          {address.speaddress}, {address.city}, {address.ward}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor=""
                      className="mb-2 block text-[0.9rem] font-medium"
                    >
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={data.fullname}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Họ và tên"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor=""
                      className="mt-4 mb-2 block text-[0.9rem] font-medium"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Số điện thoại"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor=""
                      className="mt-4 mb-2 block text-[0.9rem] font-medium"
                    >
                      Địa chỉ cụ thể
                    </label>
                    <input
                      type="text"
                      name="speaddress"
                      value={data.speaddress}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Địa chỉ cụ thể"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                    <div>
                      <label
                        htmlFor=""
                        className="mt-4 mb-2 block text-[0.9rem] font-medium"
                      >
                        Tỉnh/thành phố
                      </label>
                      <select
                        name="city"
                        required
                        value={selectedProvinceName}
                        onChange={(e) => {
                          setSelectedProvinceName(e.target.value);
                          setSelectedWard("");
                        }}
                        className="w-full rounded-md text-[0.9rem] border border-gray-200 px-2.5 py-2 outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces?.map((province) => (
                          <option key={province.id} value={province.province}>
                            {province.province}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor=""
                        className="mt-4 mb-2 block text-[0.9rem] font-medium"
                      >
                        Phường/xã
                      </label>
                      <select
                        name="ward"
                        required
                        disabled={!selectedProvince}
                        value={selectedWard}
                        onChange={(e) => setSelectedWard(e.target.value)}
                        className="w-full rounded-md text-[0.9rem] border border-gray-200 px-2.5 py-2 text-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Chọn phường/xã</option>
                        {selectedProvince?.wards.map((ward, idx) => (
                          <option key={idx} value={ward.name}>
                            {ward.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className="mt-8 text-lg font-medium">
                      Phương thức thanh toán
                    </p>
                    <div className="mt-5 grid gap-6">
                      <div className="relative">
                        <input
                          className="peer hidden"
                          id="paymethod1"
                          type="radio"
                          name="paymethod"
                          checked={paymethod === 0}
                          onChange={() => setPaymethod(0)}
                        />
                        <span className="peer-checked:border-[#197FB6] absolute right-4 top-1/2 box-content block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label
                          className="peer-checked:border-1 peer-checked:border-[#197FB6] items-center gap-[10px] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                          htmlFor="paymethod1"
                        >
                          <Image
                            Src={"/assets/other/cod.png"}
                            ClassName="w-[60px]"
                            loadingType="eager"
                            Alt=""
                          />
                          <div>
                            <span className="font-medium text-[0.9rem]">
                              Thanh toán khi giao hàng (COD)
                            </span>
                          </div>
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className="peer hidden"
                          id="paymethod2"
                          type="radio"
                          name="paymethod"
                          checked={paymethod === 1}
                          onChange={() => setPaymethod(1)}
                        />
                        <span className="peer-checked:border-[#197FB6] absolute right-4 top-1/2 box-content block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label
                          className="peer-checked:border-1 peer-checked:border-[#197FB6] items-center gap-[10px] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                          htmlFor="paymethod2"
                        >
                          <Image
                            Src={"/assets/other/momo.png"}
                            ClassName="w-[60px] rounded-lg"
                            loadingType="eager"
                            Alt=""
                          />
                          <div>
                            <span className="font-medium text-[0.9rem]">
                              Thanh toán Momo
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[30px] flex justify-between">
                  <button
                    disabled={isLoadingAddOrder}
                    className="text-[0.9rem] rounded-md bg-[#197FB6] px-4 py-2 font-medium text-white"
                  >
                    Đặt hàng
                  </button>

                  <Link
                    href={"/cart"}
                    className="text-[0.95rem] rounded-md bg-transparent py-2 font-medium text-[#338dbc] hover:text-blue-400"
                  >
                    Giỏ hàng
                  </Link>
                </div>
              </div>

              <div className="order-first lg:order-last">
                <div>
                  <p className="text-xl font-medium  mb-[15px]">Đơn hàng</p>
                  <div className="space-y-5.5 bg-white">
                    {cart?.productsInCart.map((item, index) => (
                      <div
                        className="flex rounded-lg bg-white gap-[15px]"
                        key={index}
                      >
                        <div className="relative">
                          <Image
                            Src={item.variant.images[0]}
                            Alt={""}
                            ClassName={"w-[120px] object-cover"}
                            loadingType="eager"
                          />

                          <span className="absolute flex items-center justify-center    top-[-9px] right-[-11px]    bg-[#197FB6] text-white text-[0.85rem] font-medium leading-none    rounded-full w-[25px] h-[25px]">
                            {item.variant.quantity}
                          </span>
                        </div>

                        <div className="flex w-full flex-col my-auto gap-[5px]">
                          <span className="font-semibold text-[0.9rem]">
                            {item.name}
                          </span>
                          <span className="float-right text-[0.9rem] text-gray-500">
                            {item.variant.size.namesize} /{" "}
                            {item.variant.color.namecolor}
                          </span>
                          {item.discount > 0 && (
                            <del className="text-[#707072]">
                              {item.price.toLocaleString("vi-VN")}₫
                            </del>
                          )}
                          <p className="font-medium text-[#c00]">
                            {(
                              item.price - item.discount || item.price
                            ).toLocaleString("vi-VN")}
                            ₫
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-300 my-[20px]" />

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

                  <div className="flex gap-[15px] items-center mb-[20px]">
                    <input
                      type="text"
                      id="discount"
                      name="discount"
                      className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Mã giảm giá"
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                      }}
                    />

                    <button
                      type="button"
                      disabled={isLoadingCoupon}
                      onClick={() => handleCoupon()}
                      className="w-[120px] text-[0.9rem] rounded-md bg-[#197FB6] py-2 font-medium text-white"
                    >
                      Sử dụng
                    </button>
                  </div>

                  {coupon && (
                    <div className="relative w-full flex rounded-none filter-none min-h-0 overflow-hidden px-0 bg-[#197FB6]">
                      <div className="absolute left-[-6px] top-[16.6%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                      <div className="absolute left-[-6px] top-[38%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                      <div className="absolute left-[-6px] top-[61%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                      <div className="absolute left-[-6px] top-[83.4%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>

                      <div className="absolute right-[-6px] top-[16.6%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                      <div className="absolute right-[-6px] top-[38%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                      <div className="absolute right-[-6px] top-[61%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>
                      <div className="absolute right-[-6px] top-[83.4%] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white border border-[#197FB6] z-[10]"></div>

                      <div className="border border-[#197FB6] text-[#197FB6] px-[26px] relative w-full">
                        <div className="flex items-center border-l border-r px-3 py-4 border-[#197FB6] w-full bg-white">
                          <div className="flex gap-2 flex-col w-full">
                            <h2 className="text-[1.3rem] font-semibold uppercase">
                              {coupon.discountType === 1
                                ? `Giảm ${coupon.discountValue.toLocaleString(
                                    "vi-VN"
                                  )}₫`
                                : coupon.discountType === 0
                                ? `Giảm ${coupon.discountValue}%`
                                : ""}
                            </h2>

                            <p className="text-[0.9rem] font-medium text-black">
                              {coupon.minOrderValue
                                ? `Đơn hàng phải từ ${coupon.minOrderValue.toLocaleString(
                                    "vi-VN"
                                  )}₫ trở lên`
                                : "Mọi đơn hàng"}
                              {coupon.discountType === 0 &&
                                coupon.maxDiscountValue &&
                                `, giảm tối đa ${coupon.maxDiscountValue.toLocaleString(
                                  "vi-VN"
                                )}₫`}
                            </p>

                            <p className="text-[0.9rem] font-medium text-black">
                              Mã: {coupon.code}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <hr className="border-slate-300 my-[20px]" />

                <div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between text-[1rem] font-medium mb-[15px]">
                      <p className=" text-gray-600">Tổng</p>
                      <p className=" text-gray-600">
                        {totalPrice.toLocaleString("vi-VN")}₫
                      </p>
                    </div>

                    {coupon && (
                      <div className="flex items-center justify-between text-[1rem] font-medium">
                        <p className=" text-gray-600">Phiếu giảm giá</p>
                        {coupon.discountType === 1 ? (
                          <p className=" text-gray-600">
                            -{coupon.discountValue.toLocaleString("vi-VN")}₫
                          </p>
                        ) : coupon.discountType === 0 ? (
                          <p className=" text-gray-600">
                            -
                            {Math.min(
                              (totalPrice * coupon.discountValue) / 100,
                              coupon.maxDiscountValue!
                            ).toLocaleString("vi-VN")}
                            ₫
                          </p>
                        ) : (
                          <p className=" text-gray-600"></p>
                        )}
                      </div>
                    )}

                    <hr className="border-slate-300 my-[20px]" />
                  </div>
                  <div className="flex items-center justify-between text-[1.2rem] font-medium">
                    <p className=" text-gray-900">Tổng cộng</p>
                    <p className=" text-gray-900">
                      {finalTotal.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <MenuSideCoupon toggleMenu={toggleOpen} isOpen={menuOpen} />
        </div>

        {(isLoadingAddOrder ||
          isLoadingDeleteCart ||
          isLoadingCheckPaymentStatusMomo) && (
          <div className="fixed inset-0 z-50 flex flex-col items-center gap-8 justify-center text-center bg-black/50">
            <Loading height={0} size={55} color="white" thickness={8} />
            <h2 className="text-[1.2rem] font-semibold text-white">
              Vui lòng chờ trong giây lát..
            </h2>
          </div>
        )}
      </section>
    </>
  );
}

export default CheckoutForm;
