import LayoutPage from "../../components/LayoutPage";
import AddMainBanner from "../../components/AddMainBanner";
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
