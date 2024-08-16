// import { CardWithStats } from "../../components/CardWithStats";
import { redirect } from "../../../navigation";
import { createClient } from "../../../utils/supabase/server";


export default async function Home() {
     const supabase = createClient();
     const { data, error } = await supabase.auth.getUser();
     if (error || !data?.user) {
       redirect("/app/login");
     }

     redirect("/app/search");
}
