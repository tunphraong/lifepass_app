// pages/app/logout.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
// import { supabase } from "../../lib/supabaseClient"; // Adjust the import path as needed
import { createClient } from "../../../utils/supabase/server";

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error logging out:", error.message);
        // Handle error (optional)
      } else {
        console.log("Logged out successfully");
        router.push("/app/search"); // Redirect to home page or login page
      }
    }

    handleLogout();
  }, [router]);

  return null; // You can optionally show a loading spinner or message
}
