"use client";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import ProductDetail from "./ProductDetail";
import ProductSlider from "./ProductSlider";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import { useEffect } from "react";
import toast from "react-hot-toast";

function ProductDetailSlug() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const { product, isLoading: isLoadingProductSlug } = useGetProductSlug(slug);

  const { productsBestseller } = useGetProductsBestseller();

  useEffect(() => {
    if (isLoadingProductSlug) return;

    if (!product) {
      toast.error("Không tìm thấy sản phẩm");
      router.push("/");
      return;
    }
  }, [product, isLoadingProductSlug, router]);

  return (
    <>
      {isLoadingProductSlug ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <ProductDetail product={product!} />
      )}

      {!isLoadingProductSlug && (
        <ProductSlider
          title={"Có thể bạn sẽ thích"}
          products={productsBestseller ?? []}
        />
      )}
    </>
  );
}

export default ProductDetailSlug;
