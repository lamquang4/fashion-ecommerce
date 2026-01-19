import EditCustomer from "@/components/customer/EditCustomer";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditCustomer />
      </Suspense>
    </LayoutPage>
  );
}
