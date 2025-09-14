import EditSize from "@/components/Size/EditSize";
import LayoutPage from "@/components/LayoutPage";
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
