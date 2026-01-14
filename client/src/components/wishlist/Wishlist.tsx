"use client";
import useGetWishlist from "@/hooks/useGetWishlist";
import WishlistItem from "./WishlistItem";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import Loading from "../Loading";
import ProductSlider from "../product/ProductSlider";

function Wishlist() {
  const { isLoading: isLoadingWishlist } = useGetWishlist();
  const { productsBestseller, isLoading: isLoadingProductsBestseller } =
    useGetProductsBestseller();
  return (
    <>
      {isLoadingWishlist || isLoadingProductsBestseller ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <WishlistItem />

          <ProductSlider
            products={productsBestseller || []}
            title={"Sản phẩm bán chạy"}
          />
        </>
      )}
    </>
  );
}

export default Wishlist;
