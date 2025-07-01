"use client";
import ProductSlider from "../../../components/ProductSlider";
import ProductDetail from "../../../components/ProductDetail";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams } from "next/navigation";
import useGetProductsCategory from "@/hooks/useGetProductsCategory";

function Product() {
  const params = useParams();
  const slug = params.slug as string;
  const { product } = useGetProductSlug(slug);
  const { productsCateogry } = useGetProductsCategory(
    product?.category?._id,
    product?._id
  );

  return (
    <>
      <ProductDetail product={product} />

      <ProductSlider
        title={"Có thể bạn sẽ thích"}
        products={productsCateogry}
      />
    </>
  );
}

export default Product;
