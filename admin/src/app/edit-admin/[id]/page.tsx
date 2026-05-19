import EditAdminForm from "@/components/admin/EditAdminForm";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditAdminForm />
      </Suspense>
    </LayoutPage>
  );
}
