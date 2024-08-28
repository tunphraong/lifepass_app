// app/api/studios/route.ts

import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(request, {params}) {
  const supabase = createClient();
  const {studio_id } = params;
  console.log('params 123123123', params)

  try {
    const { data: classes, error } = await supabase
      .from("classes")
      .select("*")
      .eq("studio_id", studio_id);

    if (error) {
      console.error("Error fetching studios:", error.message);
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch classes" }),
        { status: 500 }
      );
    }

    return NextResponse.json(classes);
  } catch (error) {
    console.error("Unexpected error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
