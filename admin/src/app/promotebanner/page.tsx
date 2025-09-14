import { Suspense } from "react";
import LayoutPage from "../../components/LayoutPage";
import PromoteBanner from "@/components/Banner/PromoteBanner";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <PromoteBanner />
      </Suspense>
    </LayoutPage>
  );
}
