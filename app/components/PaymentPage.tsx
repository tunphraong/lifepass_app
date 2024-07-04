"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Button,
  Card,
  Divider,
  Group,
  Image,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Schedule, Class, Studio } from "@/app/types";

async function getStudio(studioId: string): Promise<Studio | null> {
  try {
    const { data, error } = await supabase
      .from("studios")
      .select("*")
      .eq("id", studioId)
      .single();
    if (error) throw error;
    return data as Studio;
  } catch (error) {
    console.error("Error fetching studio details:", error);
    return null;
  }
}

async function getSchedule(
  scheduleId: string
): Promise<(Schedule & Class) | null> {
  try {
    const { data, error } = await supabase
      .from("schedules")
      .select("*, classes(*)")
      .eq("id", scheduleId)
      .single();

    if (error) {
      console.error("Error fetching schedules:", error.message);
      throw new Error("Failed to fetch schedules");
    }

    const { data: classData, error: classesError } = await supabase
      .from("classes")
      .select("*")
      .in("id", [data.class_id])
      .single();

    if (classesError) {
      console.error("Error fetching classes:", classesError.message);
      throw new Error("Failed to fetch class details");
    }

    return {
      ...data,
      ...classData,
    } as Schedule & Class;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return null;
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("scheduleId") ?? null;

  // Assuming your user is already fetched
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: schedule, error } = useSWR(
    scheduleId ? `/api/schedules/${scheduleId}` : null,
    getSchedule
  );
  const { data: studioData } = useSWR(
    schedule?.studio_id ? `/api/studios/${schedule?.studio_id}` : null,
    getStudio
  );

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!schedule || !studioData) return <div>Not found.</div>;

  const startTime = dayjs(schedule.start_time);
  const endTime = startTime.add(schedule.classes.duration, "minute");
  const formattedEndTime = endTime.toLocaleTimeString("vi-VN", {
    hour: "numeric",
    minute: "numeric",
  });

  const handleZaloPayClick = async () => {
    // Implement ZaloPay payment logic here
    console.log("Initiating ZaloPay payment for schedule:", schedule.id);
    // After successful payment, you can redirect to a confirmation page or update the UI accordingly
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="text-blue-500 hover:underline mb-4"
      >
        &larr; Back
      </button>

      {/* Studio Information */}
      <StudioInfo studio={studioData} />

      <div className="mt-8">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text className="font-bold text-lg">Booking Summary</Text>
          <Divider my="xs" />
          <div className="py-4">
            <p className="text-lg font-medium text-gray-800 mb-1">
              {schedule.classes.name}
            </p>
            <p className="text-gray-600 text-base mb-1">{studioData.name}</p>
            <p className="text-gray-600 text-base">
              {new Date(schedule.start_time).toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
              , {startTime.format("HH:mm")} - {formattedEndTime} (
              {schedule.duration} min)
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-2">
              {schedule.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <Divider my="xs" />
          <Button fullWidth onClick={handleZaloPayClick}>
            ZaloPay
          </Button>
        </Card>
      </div>
    </div>
  );
}
