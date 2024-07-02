// app/api/bookings/route.ts
"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

// ... (import your Studio and Class interfaces from app/types.ts)

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("get here");

  try {
    const { schedule_id } = await request.json();
    console.log("schedule id ", schedule_id);

    // 1. Fetch schedule details
    const { data: schedule, error: scheduleError } = await supabase
      .from("schedules")
      .select("id, capacity, enrolled, class_id, lifepass_spots")
      .eq("id", schedule_id)
      .single();

    if (scheduleError) {
      console.log("schedule error ", scheduleError);
      return NextResponse.json(
        { error: scheduleError.message },
        { status: 400 }
      );
    }

    // 2. Check if class is already full
    if (schedule.enrolled >= schedule?.lifepass_spots) {
      console.log("Class is fully booked");
      return NextResponse.json(
        { error: "Class is fully booked" },
        { status: 400 }
      );
    }

    // 3. Create the booking
    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        user_id: data.user.id,
        schedule_id: schedule.id,
        status: "confirmed",
      });

    if (bookingError) {
      console.log("booking error", bookingError);
      return NextResponse.json(
        { error: bookingError.message },
        { status: 500 }
      );
    }

    // 4. Update enrolled count
    // const { error: updateError } = await supabase
    //   .from("schedules")
    //   .update({ enrolled: schedule.enrolled + 1 })
    //   .eq("id", schedule.id);

    // 4. Count the number of bookings for the schedule
    const { count: bookedCount, error: countError } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("schedule_id", schedule.id);

    if (countError) {
        console.log(" get here booked count", countError);
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    console.log(" count", bookedCount);

    // const { error: updateError } = await supabase.rpc(
    //   "increment_enrolled_count",
    //   { schedule_id: schedule.id }
    // );

    // if (updateError) {
    //   console.log(" get here update error", updateError);
    //   return NextResponse.json({ error: updateError.message }, { status: 500 });
    // }

    // todo update enrolled count
    // 5. Update the enrolled count
    // const { error: updateError } = await supabase
    //   .from("schedules")
    //   .update({ enrolled: bookedCount })
    //   .eq("id", schedule.id);

    // if (updateError) {
    //     console.log(" get here update error", updateError);
    //   return NextResponse.json({ error: updateError.message }, { status: 500 });
    // }

    return NextResponse.json({
      message: "Booking successful",
      bookingId: bookingData?.id,
    });
  } catch (error) {
    console.error("Error in booking:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
