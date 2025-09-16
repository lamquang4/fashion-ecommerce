import ProductCollection from "@/components/Product/ProductCollection";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductCollection />
    </Suspense>
  );
}

export default page;
