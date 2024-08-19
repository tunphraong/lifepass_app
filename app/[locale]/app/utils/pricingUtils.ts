// app/utils/pricingUtils.ts

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

export const calculateDynamicPrice = async (
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

  // Round the final price to the nearest thousand
  finalPrice = Math.round(finalPrice / 1000) * 1000;

  return finalPrice;
};

const fetchPricingRules = async (supabase, studioId) => {
  const { data, error } = await supabase
    .from("pricing_rules")
    .select("time_of_day, day_of_week, spots_remaining, price_multiplier")
    .eq("studio_id", studioId)
    .eq("is_active", true);

  if (error) throw new Error("Could not fetch pricing rules.");
  return data;
};