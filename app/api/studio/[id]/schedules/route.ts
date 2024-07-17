import { NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";
import dayjs from "dayjs";

export async function GET(request, { params }) {
  const supabase = createClient();
  const { id } = params;
  const { searchParams } = new URL(request.url);
  // const date = searchParams.get("date");
    const weekStart = searchParams.get("weekStart");
    const weekEnd = searchParams.get("weekEnd");

  // console.log(date);

  if (!weekStart || !weekEnd) {
    return NextResponse.json(
      { error: "startDate and endDate query parameters are required" },
      { status: 400 }
    );
  }

  //   const { data, error } = await supabase
  //     .from("schedules")
  //     .select("*")
  //     .eq("studio_id", id);
  // const formattedDate = dayjs(date).format("YYYY-MM-DD");
  // const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
  // const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

  console.log('get here', weekStart, weekEnd)
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
    .gte("start_time", `${weekStart}T00:00:00Z`)
    .lt("start_time", `${weekEnd}T23:59:59Z`);

  if (schedulesError) {
    return NextResponse.json(
      { error: schedulesError.message },
      { status: 500 }
    );
  }

  // console.log(schedules);

  return NextResponse.json(schedules);
}
