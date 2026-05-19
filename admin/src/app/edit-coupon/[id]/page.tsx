import EditCouponForm from "@/components/coupon/EditCouponForm";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditCouponForm />
      </Suspense>
    </LayoutPage>
  );
}
