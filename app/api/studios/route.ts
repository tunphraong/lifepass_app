// app/api/studios/route.ts

import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/server";
import {createClient} from "../../../utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  try {
    const { data: studios, error } = await supabase.from("studios").select("*");

    if (error) {
      console.error("Error fetching studios:", error.message);
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch studios" }),
        { status: 500 }
      );
    }

    return NextResponse.json(studios);
  } catch (error) {
    console.error("Unexpected error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
