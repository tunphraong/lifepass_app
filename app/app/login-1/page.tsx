'use server'

import { createClient } from "../../../utils/supabase/client";
import AuthenticationForm from "./AuthenticationForm";
import { redirect } from "../../../../navigation";

export default async function Login() {
   const supabase = createClient();
   const { data, error } = await supabase.auth.getUser();
   if (data?.user) {
     redirect("/app/home");
   }



  return (
    // Your existing AuthenticationForm component with handleSubmit added
    <AuthenticationForm></AuthenticationForm>
  );
}
