import StudioPage from "./StudioPage";

import { createClient } from "../../../../../utils/supabase/server";
import { NextResponse } from "next/server";
// import { redirect } from "../../../../navigation";

export default async function StudioDisplayServer({params}) {
  console.log(params);
  const id = params.id;
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect("/app/login");
  // }
  let loggedIn;
  loggedIn = false;
  if (data?.user) {
    loggedIn = true
  }


  return <StudioPage id={id} loggedIn={loggedIn} />;
}
