"use client";
import ProductList from "@/components/ProductList";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import useGetProductsSale from "@/hooks/useGetProductsSale";
import Pagination from "@/components/Pagination";

function Page() {
  const params = useParams();
  const slug = params.slug as string;

  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSale(slug);

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
