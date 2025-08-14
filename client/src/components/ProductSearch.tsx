"use client";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";

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
      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <section className="w-full px-[15px] my-[40px] sm:my-[45px]">
          <ProductList products={products} />

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

export default ProductSearch;
