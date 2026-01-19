import EditCoupon from "@/components/coupon/EditCoupon";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditCoupon />
      </Suspense>
    </LayoutPage>
  );
}
