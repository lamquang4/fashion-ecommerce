"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "../ui/Image";
import MenuSideCoupon from "../ui/MenuSideCoupon";
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
import Loading from "../ui/Loading";
import Overplay from "../ui/Overplay";
import ProductBuyList from "./ProductBuyList";
import ShippingInfoForm from "./ShippingInfoForm";
import CouponApply from "./CouponApply";
import PaymentMethod from "./PaymentMethod";
import usePaymentVNPay from "@/hooks/usePaymentVNPay";
import { validatePhone } from "@/utils/validatePhone";

function CheckoutForm() {
  const router = useRouter();

  const { provinces } = useGetProvinces();
  const { cart, mutate: mutateCart, isLoading: isLoadingCart } = useGetCart();
  const { status } = useSession();
  const { addresses, isLoading: isLoadingAddresses } = useGetAddresses();
  const {
    coupon,
    error,
    getCoupon,
    isLoading: isLoadingCoupon,
  } = useGetCoupon();
  const { addOrder, isLoading: isLoadingAddOrder } = useAddOrder();
  const { createPaymentMomo, isLoading: isLoadingPaymentMomo } =
    usePaymentMomo();
  const { createPaymentVNPay, isLoading: isLoadingPaymentVNPay } =
    usePaymentVNPay();

  const [data, setData] = useState({
    fullname: "",
    phone: "",
    speaddress: "",
    city: "",
    ward: "",
  });

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [paymethod, setPaymethod] = useState<string>("");
  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    return (
      cart?.productsInCart.reduce((sum, item) => {
        const finalPrice =
          item.discount > 0 ? item.price - item.discount : item.price;

        return sum + finalPrice * item.variant.quantity;
      }, 0) || 0
    );
  }, [cart?.productsInCart]);

  const finalTotal = useMemo(() => {
    let result = totalPrice;
    if (coupon) {
      if (coupon.discountType === 1) {
        result -= coupon.discountValue;
      } else if (coupon.discountType === 0) {
        const discount = Math.min(
          (totalPrice * coupon.discountValue) / 100,
          coupon.maxDiscountValue!,
        );
        result -= discount;
      }
    }
    return Math.max(0, result);
  }, [totalPrice, coupon]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleGetAddress = useCallback((address: Address | null) => {
    if (address) {
      setData({
        fullname: address.fullname,
        phone: address.phone,
        speaddress: address.speaddress,
        city: address.city,
        ward: address.ward,
      });
    } else {
      setData({ fullname: "", phone: "", speaddress: "", city: "", ward: "" });
    }
  }, []);

  const toggleOpen = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleApplyCoupon = useCallback(() => {
    if (!couponCode.trim()) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }

    getCoupon(couponCode.trim(), totalPrice);
  }, [couponCode, totalPrice, getCoupon]);

  useEffect(() => {
    if (error && !isLoadingCoupon) {
      toast.error(error?.response?.data?.msg);
    }
  }, [error, isLoadingCoupon]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    if ((paymethod === "momo" || paymethod === "vnpay") && finalTotal < 10000) {
      toast.error(
        "Vui lòng chọn thanh toán COD vì đơn hàng có tổng tiền nhỏ hơn 10.000đ",
      );
      setPaymethod("cod");
      return;
    }

    if (!validatePhone(data.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    const items = cart?.productsInCart.map((item) => ({
      product: item._id,
      size: item.variant.size._id,
      color: item.variant.color._id,
      quantity: item.variant.quantity,
      price: item.price,
      discount: item.discount,
    }));

    try {
      const orderPayload = {
        fullname: data.fullname,
        phone: data.phone,
        speaddress: data.speaddress,
        city: data.city,
        ward: data.ward,
        paymethod,
        productsBuy: items!,
        total: finalTotal,
        ...(coupon?._id && { coupon: coupon._id }),
      };

      const orderResponse = await addOrder(orderPayload);

      if (paymethod === "cod") {
        setIsOrdering(true);
        mutateCart({ productsInCart: [] }, false);
        router.replace("/order-result?result=successful");
        return;
      }

      if (paymethod === "momo") {
        const momoResponse = await createPaymentMomo({
          total: finalTotal,
          orderCode: orderResponse.orderCode,
        });

        window.location.href = momoResponse.payUrl;
        return;
      }

      if (paymethod === "vnpay") {
        const vnpayResponse = await createPaymentVNPay({
          total: finalTotal,
          orderCode: orderResponse.orderCode,
        });

        window.location.href = vnpayResponse.payUrl;
        return;
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  useEffect(() => {
    if (isOrdering) return;
    if (isLoadingCart || isLoadingAddresses || status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (!cart || !cart.productsInCart?.length) {
      router.replace("/cart");
      return;
    }

    const outOfStockItems = cart.productsInCart.filter(
      (item) => item.variant.quantity > item.variant.stock,
    );

    if (outOfStockItems.length > 0) {
      const errorMessage = outOfStockItems
        .map(
          (item) =>
            `Sản phẩm ${item.name} (${item.variant.size.namesize}, ${item.variant.color.namecolor}) chỉ còn ${item.variant.stock}!`,
        )
        .join("\n");

      toast.error(errorMessage);
      router.replace("/cart");
    }
  }, [isOrdering, cart, isLoadingCart, isLoadingAddresses, status, router]);

  return (
    <section className="my-[40px] px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <Link href={"/"}>
          <Image
            src={"/assets/other/logo.png"}
            alt={"logo"}
            className={"w-[80px]"}
            loading="eager"
          />
        </Link>

        <hr className="border-gray-300 my-[15px]" />

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-[40px]">
            <div className="order-last lg:order-first space-y-[15px]">
              <div className="space-y-[30px]">
                <ShippingInfoForm
                  data={data}
                  setData={setData}
                  onGetAddress={handleGetAddress}
                  onChange={handleChange}
                  addresses={addresses ?? []}
                  provinces={provinces ?? []}
                />

                <PaymentMethod
                  paymethod={paymethod}
                  setPaymethod={setPaymethod}
                />

                <div className="flex justify-between items-center">
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
            </div>

            <div className="order-first lg:order-last space-y-[15px] lg:sticky lg:top-0 lg:self-start">
              <ProductBuyList
                isLoading={isLoadingCart}
                productsInCart={cart?.productsInCart ?? []}
              />

              <hr className="border-gray-300" />

              <CouponApply
                onToggleOpen={toggleOpen}
                setCouponCode={setCouponCode}
                onApplyCoupon={handleApplyCoupon}
                coupon={coupon!}
                isLoadingCoupon={isLoadingCoupon}
              />

              <hr className="border-gray-300" />

              <div className="space-y-[15px]">
                <div className="flex items-center justify-between font-medium">
                  <h5>Tổng</h5>
                  <h5>{totalPrice.toLocaleString("vi-VN")}₫</h5>
                </div>

                {coupon && (
                  <div className="flex items-center justify-between font-medium">
                    <h5>Phiếu giảm giá</h5>

                    <h5>
                      -{" "}
                      {coupon.discountType === 1
                        ? coupon.discountValue.toLocaleString("vi-VN")
                        : coupon.discountType === 0
                          ? Math.min(
                              (totalPrice * coupon.discountValue) / 100,
                              coupon.maxDiscountValue!,
                            ).toLocaleString("vi-VN")
                          : ""}
                      ₫
                    </h5>
                  </div>
                )}
              </div>

              <hr className="border-gray-300" />

              <div className="flex items-center justify-between  ">
                <h4>Tổng cộng</h4>
                <h4>{finalTotal.toLocaleString("vi-VN")}₫</h4>
              </div>
            </div>
          </div>
        </form>

        <MenuSideCoupon onToggleMenu={toggleOpen} isOpen={menuOpen} />
      </div>

      {(isLoadingAddOrder ||
        isLoadingPaymentMomo ||
        isLoadingPaymentVNPay ||
        isLoadingCoupon ||
        isLoadingCart) && (
        <Overplay IndexForZ={50}>
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát...</h4>
        </Overplay>
      )}
    </section>
  );
}

export default CheckoutForm;
