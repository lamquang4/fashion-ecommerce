import { Suspense } from "react";
import ProductSale from "@/components/product/ProductSale";

function page() {
  return (
    <Suspense>
      <ProductSale />
    </Suspense>
  );
}

export default page;
