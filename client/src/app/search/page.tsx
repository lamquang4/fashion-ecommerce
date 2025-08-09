"use client";
import Search from "@/components/Search";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}

export default page;
