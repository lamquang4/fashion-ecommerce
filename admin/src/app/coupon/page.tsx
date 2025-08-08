import LayoutPage from "../../components/LayoutPage";
import Coupon from "../../components/Coupon";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Coupon />
      </Suspense>
    </LayoutPage>
  );
}
