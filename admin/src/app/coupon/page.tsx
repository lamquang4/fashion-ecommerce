import Coupon from "@/components/Coupon/Coupon";
import LayoutPage from "../../components/LayoutPage";
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
