import Color from "@/components/color/Color";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Color />
      </Suspense>
    </LayoutPage>
  );
}
