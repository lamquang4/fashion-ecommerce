import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import SizeList from "@/components/size/SizeList";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <SizeList />
      </Suspense>
    </LayoutPage>
  );
}
