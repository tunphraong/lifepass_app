import { NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

// Function to categorize time of day into ranges
function getTimeOfDayRange(hour) {
  if (hour >= 3 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "evening";
}

// Helper function to get spots remaining range
function getSpotsRemainingRange(spots) {
  if (spots <= 5) return "0-5"; // Fine-grained tiers
  if (spots <= 10) return "6-10";
  if (spots <= 20) return "11-20";
  return "21+";
}

// Function to fetch pricing rules
const fetchPricingRules = async (supabase, studioId) => {
  const { data, error } = await supabase
    .from("pricing_rules")
    .select("time_of_day, day_of_week, spots_remaining, price_multiplier")
    .eq("studio_id", studioId)
    .eq("is_active", true);

  if (error) throw new Error("Could not fetch pricing rules.");
  return data;
};

// Function to calculate dynamic price
const calculateDynamicPrice = async (
  supabase,
  studioId,
  classData,
  startTime,
  spotsRemaining
) => {
  const rules = await fetchPricingRules(supabase, studioId);
  let finalPrice = classData.price;
  const startTimeOfDayjs = dayjs(startTime).tz("Asia/Ho_Chi_Minh");
  const hour = startTimeOfDayjs.hour();
  const timeOfDay = getTimeOfDayRange(hour);

  rules.forEach((rule) => {
    if (
      (rule.time_of_day === "all" || rule.time_of_day === timeOfDay) &&
      (rule.day_of_week === "all" ||
        rule.day_of_week === startTimeOfDayjs.format("dddd").toLowerCase())
    ) {
      finalPrice *= rule.price_multiplier;
    }
  });

  return finalPrice;
};

// start time 2024-08-21T02:00:00+00:00
// startTimeOfDayjs M {
//   '$L': 'en',
//   '$d': 2024-08-20T19:00:00.000Z,
//   '$y': 2024,
//   '$M': 7,
//   '$D': 21,
//   '$W': 3,
//   '$H': 2,
//   '$m': 0,
//   '$s': 0,
//   '$ms': 0,
//   '$x': { '$localOffset': -420, '$timezone': 'Asia/Ho_Chi_Minh' },

// start time 2024-08-21T03:00:00+00:00
// startTimeOfDayjs M {
//   '$L': 'en',
//   '$d': 2024-08-21T03:00:00.000Z,
//   '$y': 2024,
//   '$M': 7,
//   '$D': 21,
//   '$W': 3,
//   '$H': 10,
//   '$m': 0,
//   '$s': 0,
//   '$ms': 0,
//   '$x': {},
//   '$isDayjsObject': true
// }

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
