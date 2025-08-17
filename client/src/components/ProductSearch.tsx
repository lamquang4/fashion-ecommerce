"use client";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";

function ProductSearch() {
  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSearch();
  return (
    <section className="px-[10px] my-[40px] sm:my-[45px] sm:px-[15px]">
      <ProductList products={products} isLoading={isLoading} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </section>
  );
}

export default ProductSearch;
