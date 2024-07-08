import MobileNavbar from "./NavBar";
// import { createClient } from "../../utils/supabase/server";

export default async function AppLayout({
  children, // will be a page or nested layout,
}: {
  children: React.ReactNode;
}) {

  return <MobileNavbar>{children}</MobileNavbar>;
}
