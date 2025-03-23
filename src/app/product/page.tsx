import React from "react";
import ProductForm from "../components/ProductForm";
import ProductSlider from "../components/ProductSlider";

function Product() {
  return (
    <>
      <ProductForm />
      <ProductSlider title={"Có thể bạn sẽ thích"} />
    </>
  );
}

export default Product;
