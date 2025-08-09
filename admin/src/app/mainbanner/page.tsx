import { Suspense } from "react";
import LayoutPage from "../../components/LayoutPage";
import MainBanner from "../../components/MainBanner";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <MainBanner />
      </Suspense>
    </LayoutPage>
  );
}
