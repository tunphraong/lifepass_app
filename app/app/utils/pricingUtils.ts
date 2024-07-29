// app/utils/pricingUtils.ts

import dayjs from "dayjs";
// import { PricingRule } from "@/app/types";

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

export const calculateDynamicPrice = async (
  supabaseClient, // Assuming you're using SupabaseClient type
  studioId,
  classData,
  startTime,
  spotsRemaining
) => {
    const rules = await fetchPricingRules(supabaseClient, studioId);
    let finalPrice = classData.price;
    const startTimeOfDayjs = dayjs(startTime);
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

// Fetch pricing rules
// async function fetchPricingRules(
//   supabaseClient, // Assuming you're using SupabaseClient type
//   studioId: string
// ) => {
//   const { data, error } = await supabaseClient
//     .from("pricing_rules")
//     .select("time_of_day, day_of_week, spots_remaining, price_multiplier")
//     .eq("studio_id", studioId)
//     .eq("is_active", true);

//   if (error) throw new Error("Could not fetch pricing rules.");
//   return data;
// }

const fetchPricingRules = async (supabase, studioId) => {
  const { data, error } = await supabase
    .from("pricing_rules")
    .select("time_of_day, day_of_week, spots_remaining, price_multiplier")
    .eq("studio_id", studioId)
    .eq("is_active", true);

  if (error) throw new Error("Could not fetch pricing rules.");
  return data;
};