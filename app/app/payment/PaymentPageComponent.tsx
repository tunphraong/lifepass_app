"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Group,
  Space,
  Alert,
  Text,
  Stack,
  Center,
  Loader,
  Radio,
  RadioGroup,
  Title,
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Schedule, Class, Studio } from "../types";
import useSWR from "swr";
import dayjs from "dayjs";
const fetcher = (url: any) => fetch(url).then((res) => res.json());
import ZaloPayIcon from "../../../public/payments/logo-zalopay.svg"; // Replace with your actual icon path
import Image from "next/image";
import classes from "./PaymentPage.module.css";
import { showNotification } from "@mantine/notifications";
// require("dayjs/locale/vi");
import 'dayjs/locale/vi'
dayjs.locale("vi");
// Define the type for the user prop
interface User {
  id: string;
  email: string;
  // Add other necessary user fields here
}

const PaymentPageComponent = ({ userId }) => {
  
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("scheduleId") ?? null;
  const studioId = searchParams.get("studioId") ?? null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("zalopay");
  console.log("schedule ID", studioId);
  console.log('studioId', studioId);

  const {
    data: schedule,
    error: scheduleError,
    isLoading: isScheduleLoading,
  } = useSWR(`/api/schedule/${scheduleId}`, fetcher);

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

  const {
    data: scheduleWithPrice,
    error: scheduleWithPriceError,
    isLoading: scheduleLoading,
  } = useSWR(
    scheduleId
      ? `/api/studio/${studioId}/schedule/${scheduleId}`
      : null, // Change to new endpoint
    fetcher
  );

  if (scheduleWithPriceError) {
    console.log('scheduleWithPriceError', scheduleWithPriceError);
  }

  console.log('schedule with price' ,scheduleWithPrice);


  const isLoading =
    isScheduleLoading ||
    isStudioLoading ||
    isClassLoading
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
      amount: scheduleWithPrice.price,
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
          // Set the API error state if there's an error
          setApiError(data.error); // Set the API error state
          showNotification({
            title: "Error",
            message: data.error || "Booking failed. Please try again.",
            color: "red",
          });
        } else {
          router.push(data.order_url);
        }
      })
      .catch((error) => {
        notifications.show({
          color: "red",
          title: "Payment error",
          message:
            "Thanh toán không thành công. Xin liêc lạc với LifePass nếu vấn đề vẫn tiếp tục.",
          autoClose: false,
          classNames: classes,
        });
        console.error("Error 123:", error);
        // Display error message to user
      });
  };

  return apiError ? (
    <Alert
      color="red"
      title="Error"
      withCloseButton
      onClose={() => setApiError(null)}
    >
      {apiError}
      <Button variant="outline" color="gray" onClick={() => router.back()}>
        Go Back
      </Button>
    </Alert>
  ) : (
    <Stack align="center" gap="md">
      <Text fw={500}>Chọn phương thức thanh toán</Text>
      <Card shadow="sm" padding="sm" radius="md" withBorder>
        <Stack gap="lg">
          <Title order={3}>{studioData.name}</Title>
          <Text>Lớp đã chọn: {classData.name}</Text>
          <Text>
            Giá:{" "}
            {scheduleWithPrice.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>

          <Text>
            Ngày:{" "}
            {dayjs(schedule?.start_time).format("dddd, DD MMMM, YYYY")}
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
                  <Text>Zalopay</Text>
                  <Image
                    src="/payments/logo-zalopay.svg"
                    alt="Zalopay"
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
      <Divider my="md" />
      <Alert color="yellow" radius="md">
        <Group>
          <Text fw={500} size="md">
            Lưu ý:
          </Text>
          <Text size="sm">
            Bạn cần hủy lớp trước 12 giờ để được hoàn tiền.
          </Text>
        </Group>
      </Alert>
    </Stack>
  );
};

export default PaymentPageComponent;
