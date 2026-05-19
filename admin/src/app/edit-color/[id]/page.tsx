import EditColorForm from "@/components/color/EditColorForm";
import LayoutPage from "@/components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditColorForm />
      </Suspense>
    </LayoutPage>
  );
}
