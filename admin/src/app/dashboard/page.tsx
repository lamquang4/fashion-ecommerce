import Dashboard from "@/components/Dashboard/Dashboard";
import LayoutPage from "../../components/LayoutPage";
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
