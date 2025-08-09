"use client";
import ProductList from "@/components/ProductList";
import useGetCategory from "@/hooks/useGetCategory";
import useGetProductsSlug from "@/hooks/useGetProductsSlug";
import { useParams } from "next/navigation";
import Pagination from "../../../components/Pagination";
import React from "react";

function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const { category } = useGetCategory(slug);

  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSlug(slug);

  return (
    <>
      <ProductList
        products={products}
        category={category}
        isLoading={isLoading}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </>
  );
}

export default Page;
