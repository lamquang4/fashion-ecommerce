import ProductDetailSlug from "@/components/product/productdetail/ProductDetailSlug";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductDetailSlug />
    </Suspense>
  );
}

export default page;
