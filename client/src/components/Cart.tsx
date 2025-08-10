"use client";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import CartItem from "./CartItem";
import ProductSlider from "./ProductSlider";
import useGetCart from "@/hooks/useGetCart";
import Loading from "./Loading";

function Cart() {
  const { isLoading: isLoadingCart } = useGetCart();
  const { productsBestseller, isLoading: isLoadingProductsBestseller } =
    useGetProductsBestseller();
  return (
    <>
      {isLoadingCart || isLoadingProductsBestseller ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <CartItem />

          <ProductSlider
            products={productsBestseller || []}
            title={"Sản phẩm bán chạy"}
          />
        </>
      )}
    </>
  );
}

export default Cart;
