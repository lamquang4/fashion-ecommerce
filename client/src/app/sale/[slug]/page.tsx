import { Suspense } from "react";
import ProductSale from "@/components/Product/ProductSale";

function page() {
  return (
    <Suspense>
      <ProductSale />
    </Suspense>
  );
}

export default page;
