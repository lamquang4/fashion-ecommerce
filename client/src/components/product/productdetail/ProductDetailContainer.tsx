"use client";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams, useRouter } from "next/navigation";
import ProductDetail from "./ProductDetail";
import ProductSlider from "../ProductSlider";
import useGetProductsBestseller from "@/hooks/useGetProductsBestseller";
import { useEffect } from "react";
import toast from "react-hot-toast";
import BreadCrumb from "../../ui/BreadCrumb";

function ProductDetailContainer() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const { product, isLoading: isLoadingProduct } = useGetProductSlug(slug);

  const { productsBestseller, isLoading: isLoadingProducts } =
    useGetProductsBestseller();

  useEffect(() => {
    if (isLoadingProduct) return;

    if (!product) {
      toast.error("Không tìm thấy sản phẩm");
      router.push("/");
      return;
    }
  }, [product, isLoadingProduct, router]);

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
      <BreadCrumb items={array} />
      <ProductDetail product={product!} />

      <ProductSlider
        title={"Có thể bạn sẽ thích"}
        products={productsBestseller!}
        isLoading={isLoadingProducts}
      />
    </>
  );
}

export default ProductDetailContainer;
