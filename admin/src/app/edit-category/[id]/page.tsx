import EditCategoryForm from "@/components/category/EditCategoryForm";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditCategoryForm />
      </Suspense>
    </LayoutPage>
  );
}
