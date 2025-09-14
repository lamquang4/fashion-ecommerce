import EditCustomer from "@/components/Customer/EditCustomer";
import LayoutPage from "@/components/LayoutPage";
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
