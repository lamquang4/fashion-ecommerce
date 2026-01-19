import Blog from "@/components/blog/Blog";
import LayoutPage from "../../components/layout/LayoutPage";
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
