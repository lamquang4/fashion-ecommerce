"use client";
import WishlistItemList from "./WishlistItemList";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import ProductSlider from "../product/ProductSlider";

function WishlistContainer() {
  const { productsBestseller, isLoading: isLoadingProductsBestseller } =
    useGetProductsBestseller();
  return (
    <>
      <WishlistItemList />

      <ProductSlider
        products={productsBestseller || []}
        title={"Sản phẩm bán chạy"}
        isLoading={isLoadingProductsBestseller}
      />
    </>
  );
}

export default WishlistContainer;
