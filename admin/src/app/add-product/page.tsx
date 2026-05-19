import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import AddProductForm from "@/components/product/AddProductForm";

export default function Page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddProductForm />
      </Suspense>
    </LayoutPage>
  );
}
