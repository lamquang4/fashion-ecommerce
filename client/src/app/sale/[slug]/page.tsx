"use client";
import { Suspense } from "react";
import SaleSlug from "@/components/SaleSlug";

function page() {
  return (
    <Suspense>
      <SaleSlug />
    </Suspense>
  );
}

export default page;
