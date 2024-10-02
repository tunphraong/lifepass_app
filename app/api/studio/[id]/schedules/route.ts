import { NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { calculateDynamicPrice } from "../../../../[locale]/app/utils/pricingUtils";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

export async function GET(request, { params }) {
  const supabase = createClient();
  const { id } = params;
  const { searchParams } = new URL(request.url);
  // const date = searchParams.get("date");
  const weekStart = searchParams.get("weekStart");
  let weekEnd = searchParams.get("weekEnd");


  if (!weekStart || !weekEnd) {
    return NextResponse.json(
      { error: "startDate and endDate query parameters are required" },
      { status: 400 }
    );
  }

  // Ensure weekEnd is not more than 2 weeks from today
  const today = dayjs().startOf("day");
  const maxDate = today.add(2, "week").endOf("day");
  let endDate = dayjs(weekEnd).endOf("day");

  if (endDate.isAfter(maxDate)) {
    weekEnd = maxDate.format("YYYY-MM-DD");
  }

  
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
        duration,
        how_to_get_there,
        how_to_prepare,
        price,
        type
      )
    `
    )
    .eq("studio_id", id)
    .gte("start_time", `${weekStart}T00:00:00Z`)
    .lt("start_time", `${weekEnd}T23:59:59Z`)
    .order("start_time", { ascending: true });

  if (schedulesError) {
    return NextResponse.json(
      { error: schedulesError.message },
      { status: 500 }
    );
  }

  // Calculate dynamic price for each schedule
  const schedulesWithPrice = await Promise.all(
    schedules.map(async (schedule) => {
      const spotsRemaining = schedule.capacity - schedule.enrolled;

      const price = await calculateDynamicPrice(
        supabase,
        schedule.studio_id,
        schedule.classes,
        schedule.start_time,
        spotsRemaining
      );
      return { ...schedule, price };
    })
  );

  return NextResponse.json(schedulesWithPrice);
}
