// app/api/studio/[id]/route.js
import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(request, { params }) {
  const supabase = createClient();
  const { id } = params;
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
