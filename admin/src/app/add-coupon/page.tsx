import LayoutPage from "../../components/LayoutPage";
import AddCoupon from "../../components/AddCoupon";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddCoupon />
      </Suspense>
    </LayoutPage>
  );
}
