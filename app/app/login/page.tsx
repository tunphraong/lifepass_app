import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import LoginPage from "./LoginPage";
export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (data?.user) {
    redirect("/app/search");
  }

  return <LoginPage></LoginPage>;
}
