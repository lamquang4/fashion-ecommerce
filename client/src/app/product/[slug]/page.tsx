"use client";
import ProductDetailSlug from "@/components/ProductDetailSlug";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductDetailSlug />
    </Suspense>
  );
}

export default page;
