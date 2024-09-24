"use server";

import { NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export async function GET(request, { params }) {

  const supabase = createClient();
  const { id: studioId } = params;
  console.log(params);
  console.log("get here 123123", studioId);

  try {
    const { data: studio_hours, error: studio_hours_errors  } = await supabase
      .from("studio_hours")
      .select("*")
      .eq("studio_id", studioId) 

    if (studio_hours_errors || !studio_hours) {
      return NextResponse.json(
        { error: studio_hours_errors?.message || "Studio hours not found" },
        { status: 404 }
      );
    }

    console.log('hours', studio_hours);

    return NextResponse.json({ studio_hours });
  } catch (error) {
    console.error("Error fetching studio hours :", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the studio hours" },
      { status: 500 }
    );
  }
}
