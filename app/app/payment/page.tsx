"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Group,
  Space,
  Text,
  Stack,
  Center,
  Loader,
  Radio,
  RadioGroup,
} from "@mantine/core";
import { Schedule, Class, Studio } from "../types";
import useSWR from "swr";
import dayjs from "dayjs";
const fetcher = (url: any) => fetch(url).then((res) => res.json());
import ZaloPayIcon from "../../../public/payments/logo-zalopay.svg"; // Replace with your actual icon path
import Image from "next/image";

// const supabase = createClient();

// async function getStudio(studioId: string): Promise<Studio | null> {
//   try {
//     const { data, error } = await supabase
//       .from("studios")
//       .select("*")
//       .eq("id", studioId)
//       .single();
//     if (error) throw error;
//     return data as Studio;
//   } catch (error) {
//     console.error("Error fetching studio details:", error);
//     return null;
//   }
// }

// async function getSchedule(
//   scheduleId: string
// ): Promise<(Schedule & { classes: Class }) | null> {
//   try {
//     const { data, error } = await supabase
//       .from("schedules")
//       .select("*, classes(*)")
//       .eq("id", scheduleId)
//       .single();

//     if (error) {
//       console.error("Error fetching schedules:", error.message);
//       throw new Error("Failed to fetch schedules");
//     }

//     const { data: classData, error: classesError } = await supabase
//       .from("classes")
//       .select("*")
//       .in("id", [data.class_id])
//       .single();

//     if (classesError) {
//       console.error("Error fetching classes:", classesError.message);
//       throw new Error("Failed to fetch class details");
//     }

//     return {
//       ...data,
//       ...classData,
//     } as Schedule & { classes: Class };
//   } catch (error) {
//     console.error("Error fetching schedule:", error);
//     return null;
//   }
// }

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("scheduleId") ?? null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("zalopay");
  console.log(scheduleId);

  // Assuming your user is already fetched
  //   const [isLoading, setIsLoading] = useState<boolean>(true);

  //   const { data: schedule, error } = useSWR(
  //     scheduleId ? `/api/schedules/${scheduleId}` : null,
  //     getSchedule
  //   );
  const {
    data: schedule,
    error,
    isLoading,
  } = useSWR(`/api/schedule/${scheduleId}`, fetcher);

  console.log("schedule", schedule);

  const { data: studioData } = useSWR(
    schedule?.studio_id ? `/api/studio/${schedule?.studio_id}` : null,
    fetcher
  );

  const { data: classData } = useSWR(
    schedule?.studio_id ? `/api/class/${schedule?.class_id}` : null,
    fetcher
  );

  console.log("studio", studioData);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) {
    return (
      <Center className="my-6">
        <Loader />
      </Center>
    );
  }
  if (!schedule || !studioData || !classData) return <div>Not found.</div>;

  // Calculate the end time based on duration
  const startTime = dayjs(schedule.start_time);
  const endTime = startTime.add(classData?.duration || 0, "minute");
  const formattedEndTime = endTime.format("h:mm A");

  const handleZaloPayClick = async () => {
    // Implement ZaloPay payment logic here
    console.log("Initiating ZaloPay payment for schedule:", schedule.id);
    // After successful payment, you can redirect to a confirmation page or update the UI accordingly
  };

  const handlePayment = () => {
    console.log("Selected payment method:", selectedPaymentMethod);
    console.log("Proceed to payment for schedule:", schedule);
    // Implement payment logic here based on selectedPaymentMethod
  };

  return (
    // <p>hello</p>
    // <div className="container mx-auto p-4">
    //   <button
    //     onClick={() => router.back()}
    //     className="text-blue-500 hover:underline mb-4"
    //   >
    //     &larr; Back
    //   </button>

    //   {/* Studio Information */}
    //   {/* <StudioInfo studio={studioData} /> */}

    //   <div className="mt-8">
    //     <Card shadow="sm" p="lg" radius="md" withBorder>
    //       <Text className="font-bold text-lg">Booking Summary</Text>
    //       <Divider my="xs" />
    //       <div className="py-4">
    //         <p className="text-lg font-medium text-gray-800 mb-1">
    //           {classData.name}
    //         </p>
    //         <p className="text-gray-600 text-base mb-1">{studioData.name}</p>
    //         <p className="text-gray-600 text-base">
    //           {new Date(schedule.start_time).toLocaleDateString("vi-VN", {
    //             weekday: "long",
    //             year: "numeric",
    //             month: "numeric",
    //             day: "numeric",
    //           })}
    //           , {startTime.format("HH:mm")} - {formattedEndTime} (
    //           {classData?.duration} min)
    //         </p>
    //         <p className="text-lg font-semibold text-gray-800 mt-2">
    //           {schedule.price.toLocaleString("vi-VN", {
    //             style: "currency",
    //             currency: "VND",
    //           })}
    //         </p>
    //       </div>
    //       {/* <Text className="font-bold text-lg">Payment Method</Text> */}
    //       <Stack gap="sm">
    //         {/* <Text>Selected Class: {schedule?.classes?.name}</Text>
    //         <Text>Price: {schedule?.price}</Text> */}
    //         <RadioGroup
    //           value={selectedPaymentMethod}
    //           onChange={setSelectedPaymentMethod}
    //           label="Choose your payment method"
    //           required
    //         >
    //           <Radio
    //             value="zalopay"
    //             label={
    //               <div style={{ display: "flex", alignItems: "center" }}>
    //                 <Image
    //                   src="/payments/logo-zalopay.svg"
    //                   alt="ZaloPay"
    //                   width={24}
    //                   height={24}
    //                 />
    //                 <Text ml="xs">ZaloPay</Text>
    //               </div>
    //             }
    //           />

    //           {/* Add more Radio options for other payment methods here */}
    //         </RadioGroup>
    //         <Button fullWidth color="yellow" onClick={handlePayment}>
    //           Proceed to Payment
    //         </Button>
    //       </Stack>

    //     </Card>
    //   </div>
    // </div>

    <Stack align="center" gap="md">
      <Text fw={500}>Select a payment method</Text>
      <Card shadow="sm" padding="sm" radius="md" withBorder>
        <Stack gap="lg">
          <Text>Selected Class: {classData.name}</Text>
          <Text>
            Price:{" "}
            {schedule.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
          <RadioGroup
            value={selectedPaymentMethod}
            onChange={setSelectedPaymentMethod}
            label="Choose your payment method"
            required
          >
            <Radio
              value="zalopay"
              label={
                <Group >
                  <Text>ZaloPay</Text>
                  <Image
                    src="/payments/logo-zalopay.svg"
                    alt="ZaloPay"
                    width={24}
                    height={24}
                  />
                </Group>
              }
            />
            <Radio
              value="visa-mastercard-jcb"
              label={
                <div>
                  <Text>Visa, Mastercard, JCB (qua cổng ZaloPay)</Text>
                </div>
              }
            />

            {/* <Radio
              value="zalopay"
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/payments/logo-zalopay.svg"
                    alt="ZaloPay"
                    width={24}
                    height={24}
                  />
                  <Text ml="xs">ZaloPay</Text>
                </div>
              }
            /> */}
            <Radio
              value="atm"
              label={
                <div>
                  <Text>Thẻ ATM (qua cổng ZaloPay)</Text>
                </div>
              }
            />
          </RadioGroup>
          <Button fullWidth color="yellow" onClick={handlePayment}>
            Proceed to Payment
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}
