"use client";
import ProductList from "@/components/ProductList";
import { useParams } from "next/navigation";
import Pagination from "../../../components/Pagination";
import React from "react";
import useGetProductsSale from "@/hooks/useGetProductsSale";

function page() {
  const params = useParams();
  const slug = params.slug as string;

  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSale(slug);

  return (
    <>
      <ProductList
        products={products}
        isLoading={isLoading}
        totalItems={totalItems}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={12}
        totalItems={totalItems}
      />
    </>
  );
}

export default page;
