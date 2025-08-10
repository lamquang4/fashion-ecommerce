import ProductSearch from "@/components/ProductSearch";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductSearch />
    </Suspense>
  );
}

export default page;
