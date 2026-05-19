import AddAdminForm from "@/components/admin/AddAdminForm";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddAdminForm />
      </Suspense>
    </LayoutPage>
  );
}
