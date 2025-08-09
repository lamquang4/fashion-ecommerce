import EditSize from "@/components/EditSize";
import LayoutPage from "@/components/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <EditSize />
    </LayoutPage>
  );
}
