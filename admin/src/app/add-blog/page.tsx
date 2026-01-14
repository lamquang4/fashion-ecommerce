import AddBlog from "@/components/blog/AddBlog";
import LayoutPage from "../../components/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddBlog />
      </Suspense>
    </LayoutPage>
  );
}
