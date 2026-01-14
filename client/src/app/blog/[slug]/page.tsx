import BlogSlug from "@/components/blog/blogdetail/BlogSlug";
import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense>
        <BlogSlug />
      </Suspense>
    </>
  );
}

export default page;
