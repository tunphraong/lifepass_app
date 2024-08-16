// import { CardWithStats } from "../../components/CardWithStats";
import { redirect } from "../../../navigation";
import { createClient } from "../../../utils/supabase/server";


export default async function Home() {
   redirect("/app/search");
}
