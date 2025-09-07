"use client";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import ProductDetail from "./ProductDetail";
import ProductSlider from "./ProductSlider";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import { notFound } from "next/navigation";

function ProductDetailSlug() {
  const params = useParams();
  const slug = params.slug as string;

  const { product, isLoading: isLoadingProductSlug } = useGetProductSlug(slug);

  const { productsBestseller, isLoading: isLoadingProductsBestseller } =
    useGetProductsBestseller();

  if (!product && !isLoadingProductSlug) {
    return notFound();
  }

  return (
    <>
      {isLoadingProductSlug ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <ProductDetail product={product!} />
      )}

      {!isLoadingProductsBestseller && (
        <ProductSlider
          title={"Có thể bạn sẽ thích"}
          products={productsBestseller ?? []}
        />
      )}
    </>
  );
}

export default ProductDetailSlug;
