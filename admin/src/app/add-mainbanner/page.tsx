import LayoutPage from "../../components/LayoutPage";
import AddMainBanner from "../../components/AddMainBanner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export default async function page() {
  const session = await getServerSession(options);
  if (!session) redirect("/");
  return (
    <LayoutPage>
      <AddMainBanner />
    </LayoutPage>
  );
}
