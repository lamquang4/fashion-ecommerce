import CustomerList from "@/components/customer/CustomerList";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <CustomerList />
      </Suspense>
    </LayoutPage>
  );
}
