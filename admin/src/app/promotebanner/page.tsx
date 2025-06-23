import LayoutPage from "../../components/LayoutPage";
import PromoteBanner from "../../components/PromoteBanner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export default async function page() {
  const session = await getServerSession(options);
  if (!session) redirect("/");
  return (
    <LayoutPage>
      <PromoteBanner />
    </LayoutPage>
  );
}
