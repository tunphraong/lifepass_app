"use server";
// app/api/studio/[id]/route.js
import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { BookingWithDetails } from "../../../app/types";

export async function GET(request, { params }) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/app/login");
  }

  console.log("get upcoing schedule");

  const { id } = params;
  console.log("id", id);

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "*, schedules:schedules!inner(*), classes:schedules!inner(classes!inner(*)), studios:schedules!inner(studios!inner(*))"
      )
      .eq("user_id", id)
      .eq("status", "confirmed")
      .gte("schedules.start_time", new Date().toISOString());
    //   .order("schedules.start_time", { ascending: true }); 
    //   .order(".start_time");
    //   .order("schedules.start_time", { ascending: true });

    if (error) {
      console.error("Error fetching upcoming classes:", error);
      return NextResponse.json(
        { error: "Failed to fetch upcoming classes" },
        { status: 500 }
      );
    }

    // console.log(data);

    const bookingsWithClassDetails: BookingWithDetails[] = await Promise.all(
      data.map(async (booking) => {
        // Fetch the class details for each schedule_id inside an async function
        const classResponse = await supabase
          .from("classes")
          .select("*")
          .eq("id", booking.schedules.class_id)
          .single();

        // Fetch the payments for each booking
        const paymentResponse = await supabase
          .from("payments")
          .select("*")
          .eq("booking_id", booking.id)
          .single();

        return {
          ...booking,
          classes: classResponse.data,
          payments: paymentResponse.data,
        };
      })
    );

    console.log(bookingsWithClassDetails);

    return NextResponse.json(bookingsWithClassDetails);
  } catch (error) {
    console.error("Error fetching upcoming classes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
