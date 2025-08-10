import { Suspense } from "react";
import ProductSale from "@/components/ProductSale";

function page() {
  return (
    <Suspense>
      <ProductSale />
    </Suspense>
  );
}

export default page;
