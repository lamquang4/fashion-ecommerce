import Color from "@/components/Color/Color";
import LayoutPage from "../../components/LayoutPage";
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
