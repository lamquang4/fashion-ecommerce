import AddMainBanner from "@/components/banner/mainbanner/AddMainBanner";
import LayoutPage from "../../components/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddMainBanner />
      </Suspense>
    </LayoutPage>
  );
}
