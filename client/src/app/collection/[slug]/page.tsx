import ProductCollection from "@/components/product/ProductCollection";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductCollection />
    </Suspense>
  );
}

export default page;
