import { getServerSession } from "next-auth";
import RegisterForm from "../../components/RegisterForm";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export default async function page() {
  const session = await getServerSession(options);
  if (session) redirect("/");
  return (
    <>
      <RegisterForm />
    </>
  );
}
