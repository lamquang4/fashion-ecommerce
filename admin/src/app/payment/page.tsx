import Payment from "@/components/Payment";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Payment />
      </Suspense>
    </LayoutPage>
  );
}
