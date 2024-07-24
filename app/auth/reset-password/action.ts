"use server";

// import { createClient } from "@/utils/supabase/server";
import { createClient } from "../../../utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function resetPassword(formData: FormData) {
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;
  const token_hash = formData.get("token_hash") as string; // Retrieve access token from query
  const type = formData.get("type") as EmailOtpType | null;

  if (password !== passwordConfirm) {
    throw new Error("Passwords do not match");
  }

  console.log(token_hash, type);

  const supabase = createClient();
  const email = "nampham@lifepass.one";
  const type_1 = 'email';

  if (token_hash && type) {
    console.log("get here");
    const supabase = createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      type: "recovery",
      token_hash,
    });
    if (error) {
      console.log("error", error.message);
      throw new Error("Invalid authentication");
      //    redirectTo.searchParams.delete("next");
      //    return NextResponse.redirect(redirectTo);
    }

    console.log("session:", session);

    // update password
    const { error: passwordError } = await supabase.auth.updateUser({
      password: passwordConfirm,
    });

    if (passwordError) {
      console.log(passwordError);
      throw new Error(passwordError.message);
    }
  }
    // redirect("/app/login"); // Redirect to login after successful password reset
}
