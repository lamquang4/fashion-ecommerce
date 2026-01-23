import BlogList from "@/components/blog/BlogList";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <BlogList />
      </Suspense>
    </LayoutPage>
  );
}
