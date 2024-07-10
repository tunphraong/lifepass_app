"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { createClient } from '@/utils/supabase/server'
import { createClient } from "../../../utils/supabase/server";

// import { z } from "zod";

// const signupSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password should include at least 6 characters"),
//   first_name: z.string().min(1, "First name is required"),
//   last_name: z.string().min(1, "Last name is required"),
// });

export async function login(formData: FormData) {
  const supabase = createClient();
  console.log('get into log in');

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/app/error");
  }

  revalidatePath("/", "layout");
  redirect("/app");
}

export async function signup(formData: FormData) {
  console.log(formData);
  const supabase = createClient();
  // const result = signupSchema.safeParse(formData);
  //todo check formdata backend
  // if (!result.success) {
  //   console.log('get here');
  //   console.log(result.error.flatten);
  //   // return res.status(400).json({ errors: result.error.errors });
  //   // return {
  //   //   errors: result.error.flatten().fieldErrors,
  //   // };
  //    return {
  //      message: "Please enter a valid email",
  //    };
  // }

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
      },
    },
  });

  if (error) {
    redirect("/app/error");
  }

  revalidatePath("/app/search", "layout");
  redirect("/app/search");
}
