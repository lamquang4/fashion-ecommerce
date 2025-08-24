"use client";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";

function ProductSearch() {
  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSearch();
  return (
    <section className="my-[40px]">
      <div className="mx-auto max-w-[1230px] w-full px-[10px] sm:px-[15px]">
        <ProductList products={products} isLoading={isLoading} />

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
