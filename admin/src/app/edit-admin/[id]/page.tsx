import EditAdmin from "@/components/Admin/EditAdmin";
import LayoutPage from "@/components/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditAdmin />
      </Suspense>
    </LayoutPage>
  );
}
