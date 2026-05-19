import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import PromoteBannerForm from "@/components/banner/PromoteBannerForm";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <PromoteBannerForm />
      </Suspense>
    </LayoutPage>
  );
}
