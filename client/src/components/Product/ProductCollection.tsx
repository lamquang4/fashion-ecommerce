"use client";
import useGetCategory from "@/hooks/useGetCategory";
import { useParams } from "next/navigation";
import Pagination from "../Pagination";
import ProductList from "./ProductList";
import useGetProductsCollection from "@/hooks/useGetProductsCollection";

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
  } = useGetProductsCollection(slug);

  return (
    <section className="my-[40px]  px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <ProductList
          products={products}
          category={category}
          isLoading={isLoadingCategory || isLoadingProductsSlug}
          total={totalItems}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </div>
    </section>
  );
}

export default ProductCollection;
