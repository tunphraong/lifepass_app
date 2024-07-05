import PaymentPageComponent from "./PaymentPageComponent";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";


export default async function PaymentPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Serialize the user data to a plain object
  const user = {
    id: data.user.id,
    email: data.user.email,
    // Add other necessary user fields here
  };

  return <PaymentPageComponent user={user} />;
}
