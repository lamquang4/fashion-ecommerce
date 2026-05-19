import AddMainBannerForm from "@/components/banner/mainbanner/AddMainBannerForm";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddMainBannerForm />
      </Suspense>
    </LayoutPage>
  );
}
