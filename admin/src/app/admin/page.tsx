import LayoutPage from "../../components/layout/LayoutPage";
import AdminList from "../../components/admin/AdminList";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AdminList />
      </Suspense>
    </LayoutPage>
  );
}
