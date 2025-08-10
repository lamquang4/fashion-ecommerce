import { Suspense } from "react";
import ProductCollection from "@/components/ProductCollection";

function page() {
  return (
    <Suspense>
      <ProductCollection />
    </Suspense>
  );
}

export default page;
