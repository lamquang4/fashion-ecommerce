import EditCategory from "@/components/category/EditCategory";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditCategory />
      </Suspense>
    </LayoutPage>
  );
}
