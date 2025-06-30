"use client";
import ProductSlider from "../../../components/ProductSlider";
import ProductDetail from "../../../components/ProductDetail";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { useParams } from "next/navigation";

function Product() {
  const params = useParams();
  const slug = params.slug as string;
  const { product } = useGetProductSlug(slug);
  return (
    <>
      <ProductDetail product={product} />
      {
        //  <ProductSlider title={"Có thể bạn sẽ thích"} />
      }
    </>
  );
}

export default Product;
