"use client";
import Pagination from "@/components/Pagination";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";
import ProductList from "./ProductList";

function ProductSearch() {
  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSearch();
  return (
    <section className="my-[40px]  px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <ProductList
          products={products}
          isLoading={isLoading}
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

export default ProductSearch;
