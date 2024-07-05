// "use client";
import MobileNavbar from "./NavBar";
import { createClient } from "../../utils/supabase/server";
const supabase = createClient();

export default async function AppLayout({
  children, // will be a page or nested layout,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  return <MobileNavbar isLoggedIn={isLoggedIn}>{children}</MobileNavbar>;
}
