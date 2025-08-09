import EditCustomer from "@/components/EditCustomer";
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
