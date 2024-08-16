"use server";

import { NextResponse } from "next/server";
// import { createClient } from "../../../../../utils/supabase/server";
import { createClient } from "../../../../../../utils/supabase/server";
import { calculateDynamicPrice } from '../../../../../[locale]/app/utils/pricingUtils'; // Import the function

export async function GET(request, { params }) {
  const supabase = createClient();
  const { id:studioId, scheduleId } = params;
  console.log(params);
  console.log('get here 123123', studioId, scheduleId);

  try {
    // 1. Fetch schedule details
    const { data: schedule, error: scheduleError } = await supabase
      .from("schedules")
      .select("*, classes(*)") // Include class details for pricing
      .eq("id", scheduleId)
      .eq("studio_id", studioId) // Ensure it belongs to the studio
      .single();

    if (scheduleError || !schedule) {
      return NextResponse.json(
        { error: scheduleError?.message || "Schedule not found" },
        { status: 404 }
      );
    }

    // 2. Calculate dynamic price
    const spotsRemaining = schedule.capacity - schedule.enrolled;

      const price = await calculateDynamicPrice(
        supabase,
        studioId,
        schedule.classes,
        schedule.start_time,
        spotsRemaining
      );

    // 3. Return the schedule with calculated price
    return NextResponse.json({ ...schedule, price });
  } catch (error) {
    console.error("Error fetching schedule with price:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the schedule" },
      { status: 500 }
    );
  }
}
