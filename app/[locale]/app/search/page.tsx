import MyComponent from "./MyComponent";
import { redirect } from "../../../../navigation";
import { createClient } from "../../../../utils/supabase/server";

export default async function Search() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/app/login");
  }

  return (
    <>
      <MyComponent />
    </>
  );
}
