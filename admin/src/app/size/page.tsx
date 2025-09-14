import { Suspense } from "react";
import LayoutPage from "../../components/LayoutPage";
import Size from "@/components/Size/Size";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Size />
      </Suspense>
    </LayoutPage>
  );
}
