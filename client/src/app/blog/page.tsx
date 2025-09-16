import BlogAll from "@/components/Blog/BlogAll";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <BlogAll />
    </Suspense>
  );
}

export default page;
