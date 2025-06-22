"use client";
import LayoutPage from "../../components/LayoutPage";
import Account from "../../components/Account";
import { useSession } from "next-auth/react";

function page() {
  const { data: session } = useSession({
    required: true,
  });
  return (
    <LayoutPage>
      <Account user={session?.user} />
    </LayoutPage>
  );
}

export default page;
