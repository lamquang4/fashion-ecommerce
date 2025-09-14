import Blog from "@/components/Blog/Blog";
import LayoutPage from "../../components/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Blog />
      </Suspense>
    </LayoutPage>
  );
}
