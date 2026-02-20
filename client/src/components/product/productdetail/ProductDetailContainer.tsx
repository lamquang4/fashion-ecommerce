"use client";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams, useRouter } from "next/navigation";
import ProductDetail from "./ProductDetail";
import ProductSlider from "../ProductSlider";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import { useEffect } from "react";
import toast from "react-hot-toast";
import BreadCrumb from "../../ui/BreadCrumb";
import Loading from "@/components/ui/Loading";

function ProductDetailContainer() {
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

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name:
        product?.category.gender === 1
          ? "Nam"
          : product?.category.gender === 0
            ? "Nữ"
            : "",
      href: `/collection/${
        product?.category.gender === 1
          ? "nam"
          : product?.category.gender === 0
            ? "nu"
            : ""
      }`,
    },
    {
      name: product?.category.namecategory ?? "",
      href: `/collection/${product?.category.slug ?? ""}`,
    },
    {
      name: product?.name ?? "",
    },
  ];

  return (
    <>
      {isLoadingProductSlug ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <BreadCrumb items={array} />
          <ProductDetail product={product!} />
        </>
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

export default ProductDetailContainer;
