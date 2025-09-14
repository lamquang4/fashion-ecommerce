import { Suspense } from "react";
import LayoutPage from "../../components/LayoutPage";
import Product from "@/components/Product/Product";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Product />
      </Suspense>
    </LayoutPage>
  );
}
