"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "./../Image";
import MenuSideCoupon from "./../MenuSideCoupon";
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
import Loading from "./../Loading";
import Overplay from "./../Overplay";
import ProductBuyList from "./ProductBuyList";
import ShippingInfoForm from "./ShippingInfoForm";
import CouponApply from "./CouponApply";
import PaymentMethod from "./PaymentMethod";
import useGetStatusPaymentMomo from "@/hooks/useGetStatusPaymentMomo";

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
  const { getStatusPaymentMomo, isLoading: isLoadingCheckPaymentStatusMomo } =
    useGetStatusPaymentMomo();

  const [data, setData] = useState({
    fullname: "",
    phone: "",
    speaddress: "",
  });

  const [provinceName, setProvinceName] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [paymethod, setPaymethod] = useState<number>();

  const totalPrice = useMemo(() => {
    return (
      cart?.productsInCart.reduce((sum, item) => {
        const finalPrice =
          item.discount > 0 ? item.price - item.discount : item.price;

        return sum + finalPrice * item.variant.quantity;
      }, 0) || 0
    );
  }, [cart?.productsInCart]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleGetAddress = useCallback((address: Address | null) => {
    if (address) {
      setData({
        fullname: address.fullname,
        phone: address.phone,
        speaddress: address.speaddress,
      });
      setProvinceName(address.city);
      setWard(address.ward);
    } else {
      setData({ fullname: "", phone: "", speaddress: "" });
      setProvinceName("");
      setWard("");
    }
  }, []);

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

      const res = await getStatusPaymentMomo(orderId);

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

      mutateCart({ productsInCart: [] }, false);
      localStorage.removeItem("checkoutData");
      localStorage.removeItem("orderId");

      toast.success(`Đặt hàng thành công!`);
      router.replace("/");
    };

    handleOrderMomoPayment();
  }, []);

  const finalTotal = useMemo(() => {
    let result = totalPrice;
    if (coupon) {
      if (coupon.discountType === 1) {
        result -= coupon.discountValue;
      } else if (coupon.discountType === 0) {
        const discount = Math.min(
          (totalPrice * coupon.discountValue) / 100,
          coupon.maxDiscountValue!
        );
        result -= discount;
      }
    }
    return Math.max(0, result);
  }, [totalPrice, coupon]);

  const toggleOpen = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleApplyCoupon = useCallback(() => {
    if (!couponCode.trim()) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }

    getCoupon(couponCode.trim(), totalPrice);

    if (error && !isLoadingCoupon) {
      toast.error(error?.response?.data?.msg);
    }
  }, [couponCode, error, isLoadingCoupon]);

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
          city: provinceName,
          ward: ward,
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
        city: provinceName,
        ward: ward,
        paymethod: paymethod!,
        productsBuy: items!,
        total: finalTotal,
        coupon: coupon?._id,
      });

      toast.success(`Đặt hàng thành công!`);
      router.replace("/");

      mutateCart({ productsInCart: [] }, false);
    }
  };

  return (
    <section className="my-[40px] px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <Link href={"/"}>
          <Image
            Src={"/assets/other/logo.png"}
            Alt={""}
            ClassName={"w-[80px]"}
            loadingType="eager"
          />
        </Link>

        <hr className="border-gray-300 my-[15px]" />

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-[40px]">
            <div className="order-last lg:order-first space-y-[15px]">
              <div className="space-y-[30px]">
                <ShippingInfoForm
                  data={data}
                  provinceName={provinceName}
                  setProvinceName={setProvinceName}
                  ward={ward}
                  setWard={setWard}
                  handleGetAddress={handleGetAddress}
                  handleChange={handleChange}
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

            <div className="order-first lg:order-last space-y-[15px]">
              <ProductBuyList productsInCart={cart?.productsInCart ?? []} />

              <hr className="border-gray-300" />

              <CouponApply
                toggleOpen={toggleOpen}
                setCouponCode={setCouponCode}
                handleApplyCoupon={handleApplyCoupon}
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
                            coupon.maxDiscountValue!
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

        <MenuSideCoupon toggleMenu={toggleOpen} isOpen={menuOpen} />
      </div>

      {(isLoadingAddOrder ||
        isLoadingPaymentMomo ||
        isLoadingCheckPaymentStatusMomo ||
        isLoadingCoupon) && (
        <Overplay IndexForZ={50}>
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát...</h4>
        </Overplay>
      )}
    </section>
  );
}

export default CheckoutForm;
