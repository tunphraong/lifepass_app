"use server";

import { createClient } from "../../../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "../../../../navigation";

export async function POST(req, res) {
  const supabase = createClient();
  // console.log(req, res);
  if (req.method === "POST") {
    const { email, password } = req.body;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("errorerrorerrorerrorerrorerror", error);
      redirect("/app/error");
      // return res.status(401).json({ error: error.message });
    }

    console.log('get here no error')
    revalidatePath("/", "layout");
    redirect("/app");
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
