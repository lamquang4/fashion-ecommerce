"use client";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams } from "next/navigation";
import useGetProductsCategory from "@/hooks/useGetProductsCategory";
import Loading from "@/components/Loading";
import ProductDetail from "./ProductDetail";
import ProductSlider from "./ProductSlider";

function ProductSlug() {
  const params = useParams();
  const slug = params.slug as string;
  const { product, isLoading } = useGetProductSlug(slug);

  const { productsCateogry } = useGetProductsCategory(
    product?.category?._id || "",
    product?._id || ""
  );

  return (
    <>
      {isLoading ? (
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

export default ProductSlug;
