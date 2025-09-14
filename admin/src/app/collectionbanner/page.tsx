import CollectionBanner from "@/components/Banner/CollectionBanner";
import LayoutPage from "../../components/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <CollectionBanner />
      </Suspense>
    </LayoutPage>
  );
}
