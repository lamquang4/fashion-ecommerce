import ColorList from "@/components/color/ColorList";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <ColorList />
      </Suspense>
    </LayoutPage>
  );
}
