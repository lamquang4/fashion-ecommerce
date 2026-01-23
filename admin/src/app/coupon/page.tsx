import CouponList from "@/components/coupon/CouponList";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <CouponList />
      </Suspense>
    </LayoutPage>
  );
}
