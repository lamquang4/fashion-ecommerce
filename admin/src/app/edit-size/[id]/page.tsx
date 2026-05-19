import EditSizeForm from "@/components/size/EditSizeForm";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditSizeForm />
      </Suspense>
    </LayoutPage>
  );
}
