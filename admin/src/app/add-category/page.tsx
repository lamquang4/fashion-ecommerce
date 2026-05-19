import AddCategoryForm from "@/components/category/AddCategoryForm";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddCategoryForm />
      </Suspense>
    </LayoutPage>
  );
}
