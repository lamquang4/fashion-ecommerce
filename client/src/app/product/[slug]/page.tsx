"use client";
import ProductDetailSlug from "@/components/Product/ProductDetail/ProductDetailSlug";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductDetailSlug />
    </Suspense>
  );
}

export default page;
