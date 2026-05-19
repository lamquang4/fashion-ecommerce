import LayoutPage from "@/components/layout/LayoutPage";
import EditProductForm from "@/components/product/EditProductForm";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditProductForm />
      </Suspense>
    </LayoutPage>
  );
}
