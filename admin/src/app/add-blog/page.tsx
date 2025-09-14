import AddBlog from "@/components/Blog/AddBlog";
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
