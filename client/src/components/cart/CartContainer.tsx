"use client";
import useGetCart from "@/hooks/useGetCart";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import CartItem from "./CartItemList";
import ProductSlider from "../product/ProductSlider";

function CartContainer() {
  const { cart, isLoading: isLoadingCart } = useGetCart();
  const { productsBestseller, isLoading: isLoadingProductsBestseller } =
    useGetProductsBestseller();
  return (
    <>
      <CartItem cart={cart!} isLoading={isLoadingCart} />

      <ProductSlider
        products={productsBestseller ?? []}
        title={"Sản phẩm bán chạy"}
        isLoading={isLoadingProductsBestseller}
      />
    </>
  );
}

export default CartContainer;
