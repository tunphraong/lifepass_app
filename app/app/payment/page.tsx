import PaymentPageComponent from "./PaymentPageComponent";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";


export default async function PaymentPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return <PaymentPageComponent user={data.user} />;
}
