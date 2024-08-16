// import { CardWithStats } from "../../components/CardWithStats";
import { redirect } from "../../../navigation";
export const dynamic = "force-dynamic";

export default async function Home() {
   redirect("/app/search");
}
