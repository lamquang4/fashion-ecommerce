import EditSize from "@/components/size/EditSize";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditSize />
      </Suspense>
    </LayoutPage>
  );
}
