import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import Size from "@/components/size/Size";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Size />
      </Suspense>
    </LayoutPage>
  );
}
