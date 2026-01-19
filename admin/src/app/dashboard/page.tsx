import Dashboard from "@/components/dashboard/Dashboard";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Dashboard />
      </Suspense>
    </LayoutPage>
  );
}
