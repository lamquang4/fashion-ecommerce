"use client";
import useGetCart from "@/hooks/useGetCart";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import Loading from "../Loading";
import ProductSlider from "../ProductSlider";
import CartItem from "./CartItem";

function Cart() {
  const { cart, isLoading: isLoadingCart } = useGetCart();
  const { productsBestseller, isLoading: isLoadingProductsBestseller } =
    useGetProductsBestseller();
  return (
    <>
      {isLoadingCart || isLoadingProductsBestseller ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <CartItem cart={cart!} />

          <ProductSlider
            products={productsBestseller ?? []}
            title={"Sản phẩm bán chạy"}
          />
        </>
      )}
    </>
  );
}

export default Cart;
