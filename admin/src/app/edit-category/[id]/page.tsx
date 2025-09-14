import EditCategory from "@/components/Category/EditCategory";
import LayoutPage from "@/components/LayoutPage";
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
