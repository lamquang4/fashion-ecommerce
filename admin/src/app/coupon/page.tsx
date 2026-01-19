import Coupon from "@/components/coupon/Coupon";
import LayoutPage from "../../components/layout/LayoutPage";
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
