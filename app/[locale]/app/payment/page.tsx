import PaymentPageComponent from "./PaymentPageComponent";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "../../../../navigation";
export const dynamic = "force-dynamic";


export default async function PaymentPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/app/login')
  }

  // Serialize the user data to a plain object
  const userId = data.user.id;

  return <PaymentPageComponent userId={userId} />;
}
