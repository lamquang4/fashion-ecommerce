import React from "react";
import WishlistItem from "../components/WishlistItem";
import ProductSlider from "../components/ProductSlider";

function Wishlist() {
  return (
    <>
      <WishlistItem />
      <ProductSlider title={"Có thể bạn sẽ thích"} />
    </>
  );
}

export default Wishlist;
