import EditAdmin from "@/components/EditAdmin";
import LayoutPage from "@/components/LayoutPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(options);
  if (!session) redirect("/");
  return (
    <LayoutPage>
      <EditAdmin />
    </LayoutPage>
  );
}
