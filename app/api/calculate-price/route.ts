import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import dayjs from "dayjs";

// ... (import your Class, Schedule interfaces)

// Function to categorize time of day into ranges
function getTimeOfDayRange(hour: number): string {
  if (hour >= 3 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "evening";
}

const calculateDynamicPrice = async (
  studioId: string,
  classId: string,
  startTime: string,
  spotsRemaining: number
): Promise<number> => {
  const supabase = createClient();

  // 1. Fetch Base Price (from classes table)
  const { data: classData, error: classError } = await supabase
    .from("classes")
    .select("price, type")
    .eq("id", classId) // Assuming you pass the class ID
    .single();

  if (classError) {
    throw new Error("Could not fetch base price for the class.");
  }

  let finalPrice = classData.price;

  // 2. Fetch and Apply Pricing Rules (from pricing_rules table)
  const { data: rules, error: rulesError } = await supabase
    .from("pricing_rules")
    .select("time_of_day, day_of_week, spots_remaining, price_multiplier")
    .eq("studio_id", studioId)
    // .eq("class_type", classType)
    .eq("is_active", true);

  if (rulesError) {
    throw new Error("Could not fetch pricing rules.");
  }

  // Apply each rule's multiplier to the price
  rules.forEach((rule) => {
    const startTimeOfDayjs = dayjs(startTime);
    const hour = startTimeOfDayjs.hour();
    console.log(startTimeOfDayjs.format("dddd").toLocaleLowerCase())
    const timeOfDay = getTimeOfDayRange(hour);
    console.log(timeOfDay);
    

    if (
      (rule.time_of_day === "all" ||
        rule.time_of_day === timeOfDay) &&
      (rule.day_of_week === "all" ||
        rule.day_of_week === startTimeOfDayjs.format("dddd").toLowerCase()) // Check day of week
      //  && (rule.spots_remaining === "all" ||
      //     getSpotsRemainingRange(spotsRemaining) === rule.spots_remaining) // Check spots remaining range
    ) {
      console.log(finalPrice, rule.price_multiplier);
      finalPrice *= rule.price_multiplier;
    }
  });

  

  return finalPrice;
};

// Helper function to get spots remaining range
function getSpotsRemainingRange(spots: number): string {
  if (spots <= 5) return "0-5"; // Fine-grained tiers
  if (spots <= 10) return "6-10";
  if (spots <= 20) return "11-20";
  return "21+";
}


export async function POST(req: NextRequest) {
    
  try {
    const { studioId, classId, startTime, spotsRemaining } = await req.json();
    // console.log("got into cal price");
    const dynamicPrice = await calculateDynamicPrice(
      studioId,
      classId,
      startTime,
      spotsRemaining
    );
    // console.log('dynamicPrice', dynamicPrice);
    
    return NextResponse.json({ price: dynamicPrice });
  } catch (error) {
    // console.error("Error calculating price:", error);
    return NextResponse.json(
      { error: "Error calculating price" },
      { status: 500 }
    );
  }
}
