import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function page() {
  const session = await getServerSession(options);
  if (session) redirect("/dashboard");
  return (
    <>
      <LoginForm />
    </>
  );
}
