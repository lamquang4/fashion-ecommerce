import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import MainBanner from "@/components/banner/mainbanner/MainBanner";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <MainBanner />
      </Suspense>
    </LayoutPage>
  );
}
