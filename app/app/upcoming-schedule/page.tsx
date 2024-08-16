import { createClient } from "../../../utils/supabase/server";
import UpcomingPage from "./Upcoming";
// import { redirect } from "next/navigation";
import {redirect } from "../../../../navigation"


export const dynamic = "force-dynamic";
export default async function Upcoming() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/app/login");
  }

  return <UpcomingPage user={data?.user} />;
}
