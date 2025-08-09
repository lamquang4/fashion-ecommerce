"use client";
import ProductSlug from "@/components/ProductSlug";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductSlug />
    </Suspense>
  );
}

export default page;
