import ProductDetailContainer from "@/components/product/productdetail/ProductDetailContainer";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductDetailContainer />
    </Suspense>
  );
}

export default page;
