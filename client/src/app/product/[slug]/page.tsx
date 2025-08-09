"use client";
import ProductSlider from "../../../components/ProductSlider";
import ProductDetail from "../../../components/ProductDetail";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams } from "next/navigation";
import useGetProductsCategory from "@/hooks/useGetProductsCategory";
import Loading from "@/components/Loading";
import { Suspense } from "react";

function Product() {
  const params = useParams();
  const slug = params.slug as string;
  const { product, isLoading } = useGetProductSlug(slug);

  const { productsCateogry } = useGetProductsCategory(
    product?.category?._id || "",
    product?._id || ""
  );

  return (
    <Suspense>
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
    </Suspense>
  );
}

export default Product;
