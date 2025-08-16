"use client";
import ProductList from "@/components/ProductList";
import useGetCategory from "@/hooks/useGetCategory";
import useGetProductsSlug from "@/hooks/useGetProductsSlug";
import { useParams } from "next/navigation";
import Pagination from "./Pagination";

function ProductCollection() {
  const params = useParams();
  const slug = params.slug as string;

  const { category, isLoading: isLoadingCategory } = useGetCategory(slug);

  const {
    products,
    totalPages,
    totalItems,
    currentPage,
    isLoading: isLoadingProductsSlug,
  } = useGetProductsSlug(slug);

  return (
    <>
      <section className="px-[10px] my-[40px] sm:my-[45px] sm:px-[15px]">
        <ProductList
          products={products}
          category={category}
          isLoading={isLoadingCategory || isLoadingProductsSlug}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </section>
    </>
  );
}

export default ProductCollection;
