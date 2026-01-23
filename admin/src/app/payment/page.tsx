import PaymentList from "@/components/PaymentList";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <PaymentList />
      </Suspense>
    </LayoutPage>
  );
}
