import BlogListContainer from "@/components/blog/BlogListContainer";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <BlogListContainer />
    </Suspense>
  );
}

export default page;
