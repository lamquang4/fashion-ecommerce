import LayoutPage from "../../components/LayoutPage";
import { Suspense } from "react";
import Blog from "@/components/Blog";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Blog />
      </Suspense>
    </LayoutPage>
  );
}
