import { NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";
import dayjs from "dayjs";

export async function GET(request, { params }) {
  const supabase = createClient();
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  console.log(date);

  console.log("get here");

  //   const { data, error } = await supabase
  //     .from("schedules")
  //     .select("*")
  //     .eq("studio_id", id);
  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  const { data: schedules, error: schedulesError } = await supabase
    .from("schedules")
    .select(
      `
      *,
      classes (
        id,
        name,
        description,
        difficulty,
        duration
      )
    `
    )
    .eq("studio_id", id)
    .gte("start_time", `${formattedDate}T00:00:00Z`)
    .lt("start_time", `${formattedDate}T23:59:59Z`);

  if (schedulesError) {
    return NextResponse.json(
      { error: schedulesError.message },
      { status: 500 }
    );
  }

  // console.log(schedules);

  return NextResponse.json(schedules);
}
