import LayoutPage from "../../components/LayoutPage";
import Size from "../../components/Size";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export default async function page() {
  const session = await getServerSession(options);
  if (!session) redirect("/");
  return (
    <LayoutPage>
      <Size />
    </LayoutPage>
  );
}
