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
  Title,
} from "@mantine/core";
import { Schedule, Class, Studio } from "../types";
import useSWR from "swr";
import dayjs from "dayjs";
const fetcher = (url: any) => fetch(url).then((res) => res.json());
import ZaloPayIcon from "../../../public/payments/logo-zalopay.svg"; // Replace with your actual icon path
import Image from "next/image";
import { createClient } from "../../../utils/supabase/client";

// Define the type for the user prop
interface User {
  id: string;
  email: string;
  // Add other necessary user fields here
}

const PaymentPageComponent = ({ userId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("scheduleId") ?? null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("zalopay");
  // console.log(scheduleId);
  const {
    data: schedule,
    error: scheduleError,
    isLoading: isScheduleLoading,
  } = useSWR(`/api/schedule/${scheduleId}`, fetcher);

  console.log("schedule", schedule);

  const {
    data: studioData,
    isLoading: isStudioLoading,
    error: studioError,
  } = useSWR(
    schedule?.studio_id ? `/api/studio/${schedule?.studio_id}` : null,
    fetcher
  );

  const {
    data: classData,
    isLoading: isClassLoading,
    error: classError,
  } = useSWR(
    schedule?.studio_id ? `/api/class/${schedule?.class_id}` : null,
    fetcher
  );

  const isLoading = isScheduleLoading || isStudioLoading || isClassLoading;
  const error = scheduleError || studioError || classError;

  console.log("studio", studioData);

  if (error) return <div>Error loading data. Please try again.</div>;
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

  const handlePayment = () => {
    // console.log("Selected payment method:", selectedPaymentMethod);
    // console.log("Proceed to payment for schedule:", schedule);
    // Implement payment logic here based on selectedPaymentMethod
    const paymentDetails = {
      amount: schedule.price,
      bank_code: "zalopayapp",
      schedule_id: schedule.id,
      user_id: userId,
    };

    fetch("/api/zalopay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Handle error response from API
          console.error("Error:", data.error);
          // Display error message to user
        } else {
          // Handle successful response from API
          console.log("Success:", data);
          router.push(data.order_url);
          // Redirect or display success message to user
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display error message to user
      });
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
      <Text fw={500}>Chọn phương thức thanh toán</Text>
      <Card shadow="sm" padding="sm" radius="md" withBorder>
        <Stack gap="lg">
          <Title order={3}>{studioData.name}</Title>
          <Text>Lớp đã chọn: {classData.name}</Text>
          <Text>
            Giá:{" "}
            {classData.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>

          <Text>
            Ngày: {dayjs(schedule?.start_time).format("MMMM D, YYYY")}
          </Text>
          <Text>
            Thời gian: {dayjs(schedule?.start_time).format("h:mm A")} -{" "}
            {dayjs(schedule?.start_time)
              .add(classData?.duration, "minute")
              .format("h:mm A")}
          </Text>

          <RadioGroup
            value={selectedPaymentMethod}
            onChange={setSelectedPaymentMethod}
            // label=""
            label="Chọn phương thức thanh toán của bạn"
            required
          >
            <Radio
              value="zalopay"
              label={
                <Group>
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
            {/* <Radio
              value="visa-mastercard-jcb"
              label={
                <div>
                  <Text>Visa, Mastercard, JCB (qua cổng ZaloPay)</Text>
                </div>
              }
            /> */}

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
            {/* <Radio
              value="atm"
              label={
                <div>
                  <Text>Thẻ ATM (qua cổng ZaloPay)</Text>
                </div>
              }
            /> */}
          </RadioGroup>
          <Button fullWidth color="yellow" onClick={handlePayment}>
            Tiếp tục thanh toán
            {/* Proceed to Payment */}
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};

export default PaymentPageComponent;
