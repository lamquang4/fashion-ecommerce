import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import MainBannerList from "@/components/banner/mainbanner/MainBannerList";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <MainBannerList />
      </Suspense>
    </LayoutPage>
  );
}
