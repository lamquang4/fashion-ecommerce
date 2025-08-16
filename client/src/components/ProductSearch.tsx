"use client";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function ProductSearch() {
  const {
    products,
    totalPages,
    totalItems,
    currentPage,
    isLoading,
    setKeyword,
  } = useGetProductsSearch();

  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    if (search) {
      setKeyword(search);
    }
  }, [search, setKeyword]);

  return (
    <>
      <section className="px-[10px] my-[40px] sm:my-[45px] sm:px-[15px]">
        <ProductList products={products} isLoading={isLoading} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </section>
    </>
  );
}

export default ProductSearch;
