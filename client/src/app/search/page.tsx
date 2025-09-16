import ProductSearch from "@/components/Product/ProductSearch";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductSearch />
    </Suspense>
  );
}

export default page;
