import EditColor from "@/components/color/EditColor";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditColor />
      </Suspense>
    </LayoutPage>
  );
}
