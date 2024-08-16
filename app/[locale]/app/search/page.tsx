import MyComponent from "./MyComponent";
import { redirect } from "../../../../navigation";
import { createClient } from "../../../../utils/supabase/server";

export default async function Search() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  let loggedIn = false;
  if (error || !data?.user) {
    loggedIn = false;
  } else{
    loggedIn = true;
  }

  return (
    <>
      <MyComponent loggedIn={loggedIn}/>
    </>
  );
}
