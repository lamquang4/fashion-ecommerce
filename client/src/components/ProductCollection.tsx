"use client";
import ProductList from "@/components/ProductList";
import useGetCategory from "@/hooks/useGetCategory";
import useGetProductsSlug from "@/hooks/useGetProductsSlug";
import { useParams } from "next/navigation";
import Pagination from "./Pagination";
import Loading from "./Loading";

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
      {isLoadingCategory || isLoadingProductsSlug ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <section className="px-[10px] my-[40px] sm:my-[45px] sm:px-[15px]">
          <ProductList products={products} category={category} />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            totalItems={totalItems}
          />
        </section>
      )}
    </>
  );
}

export default ProductCollection;
