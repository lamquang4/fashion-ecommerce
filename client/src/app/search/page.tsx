"use client";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

function Page() {
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
    <Suspense>
      <ProductList products={products} isLoading={isLoading} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </Suspense>
  );
}

export default Page;
