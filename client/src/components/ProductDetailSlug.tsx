"use client";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams } from "next/navigation";
import useGetProductsCategory from "@/hooks/useGetProductsCategory";
import Loading from "@/components/Loading";
import ProductDetail from "./ProductDetail";
import ProductSlider from "./ProductSlider";

function ProductDetailSlug() {
  const params = useParams();
  const slug = params.slug as string;

  const { product, isLoading: isLoadingProductSlug } = useGetProductSlug(slug);
  const { productsCateogry, isLoading: isLoadingProductsCategory } =
    useGetProductsCategory(product?.category?._id || "", product?._id || "");

  return (
    <>
      {isLoadingProductSlug || isLoadingProductsCategory ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <ProductDetail />

          <ProductSlider
            title={"Có thể bạn sẽ thích"}
            products={productsCateogry || []}
          />
        </>
      )}
    </>
  );
}

export default ProductDetailSlug;
