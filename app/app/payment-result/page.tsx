"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { DurationObject } from "ics";
import { useEffect, useState } from "react";
import { DateTime, type EventAttributes } from "ics";
import {
  Badge,
  Card,
  Divider,
  Group,
  Space,
  Text,
  Stack,
  Center,
  Loader,
  Container,
  Button
} from "@mantine/core";
import useSWR from "swr";
import dayjs from "dayjs";
import { createEvent } from "ics";
import "dayjs/locale/vi";
dayjs.locale("vi");

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const PaymentResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? null;
  const apptransid = searchParams.get("apptransid") ?? null;

  // console.log("apptransid", apptransid);

  // const {
  //   data: paymentResult,
  //   error: paymentError,
  //   isLoading: paymentLoading,
  // } = useSWR(
  //   apptransid ? `/api/zalo-payment-status/${apptransid}` : null,
  //   fetcher
  // );

  const { data: paymentResult, error: paymentError } = useSWR(
    `/api/zalo-payment-status/${apptransid}`,
    fetcher
  );

  const { data: schedule, error: scheduleError } = useSWR(
    paymentResult?.schedule_id
      ? `/api/schedule/${paymentResult?.schedule_id}`
      : null,
    fetcher
  );

  const { data: studioData, error: studioError } = useSWR(
    schedule?.studio_id ? `/api/studio/${schedule?.studio_id}` : null,
    fetcher
  );

  const { data: classData, error: classError } = useSWR(
    schedule?.class_id ? `/api/class/${schedule?.class_id}` : null,
    fetcher
  );

  const isLoading = !paymentResult || !schedule || !studioData || !classData;
  const error = paymentError || scheduleError || studioError || classError;

  if (error) return <div>Error loading data. Please try again.</div>;
  if (isLoading) {
    return (
      <Center className="my-6">
        <Loader />
      </Center>
    );
  }

  // Calculate the end time based on duration
  const startTime = dayjs(schedule.start_time);
  const endTime = startTime.add(classData?.duration || 0, "minute");
  const formattedEndTime = endTime.format("h:mm A");

  const getStatusText = () => {
    switch (paymentResult.status) {
      case "success":
        return "Thanh toán thành công";
      case "pending":
        return "Đang chờ xử lý thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      default:
        return "Trạng thái thanh toán không xác định";
    }
  };

  const handleAddToCalendar = () => {
    const event: EventAttributes = {
      start: [
        startTime.year(),
        startTime.month() + 1,
        startTime.date(),
        startTime.hour(),
        startTime.minute(),
      ],
      duration: { minutes: classData?.duration || 0 },
      title: `Class: ${classData.name}`,
      description: `Class: ${classData.name} at ${studioData?.name}`,
      location: studioData?.address,
      status: "CONFIRMED",
    };

    createEvent(event, (error, value) => {
      if (error) {
        console.log(error);
        return;
      }

      const blob = new Blob([value], { type: "text/calendar" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${classData.name}-${startTime.format("YYYYMMDD")}.ics`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    // <Stack align="center" gap="md">
    //   <Card shadow="sm" padding="sm" radius="md" withBorder>
    //     <Stack gap="lg">
    //       <Group gap="apart">
    //         <Text fw={500}>Kết quả thanh toán</Text>
    //         <Badge
    //           color={
    //             paymentResult.status === "success"
    //               ? "green"
    //               : paymentResult.status === "pending"
    //               ? "yellow"
    //               : "red"
    //           }
    //         >
    //           {paymentResult.status === "success"
    //             ? "Thành công"
    //             : paymentResult.status === "pending"
    //             ? "Đang xử lý"
    //             : "Thất bại"}
    //         </Badge>
    //       </Group>
    //       <Divider />
    //       <Text>Lớp đã chọn: {classData.name}</Text>
    //       <Text>
    //         Giá:{" "}
    //         {classData.price.toLocaleString("vi-VN", {
    //           style: "currency",
    //           currency: "VND",
    //         })}
    //       </Text>
    //       <Text>
    //         Ngày: {dayjs(schedule?.start_time).format("MMMM D, YYYY")}
    //       </Text>
    //       <Text>
    //         Thời gian: {dayjs(schedule?.start_time).format("h:mm A")} -{" "}
    //         {dayjs(schedule?.start_time)
    //           .add(classData?.duration, "minute")
    //           .format("h:mm A")}
    //       </Text>
    //       {/* <Text>Phương thức thanh toán: {paymentResult.payment_method}</Text> */}
    //     </Stack>
    //   </Card>
    // </Stack>

    <Container size="sm" my="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="lg">
          <Group grow>
            <Text fw={500} size="xl">
              Kết quả thanh toán
            </Text>
            <Badge
              size="lg"
              color={
                paymentResult.status === "success"
                  ? "green"
                  : paymentResult.status === "pending"
                  ? "yellow"
                  : "red"
              }
            >
              {paymentResult.status === "success"
                ? "Thành công"
                : paymentResult.status === "pending"
                ? "Đang xử lý"
                : "Thất bại"}
            </Badge>
          </Group>
          <Divider />
          <Text size="lg">Lớp đã chọn: {classData.name}</Text>
          <Text size="lg">
            Giá:{" "}
            {paymentResult.amount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
          <Text size="lg">
            Ngày: {dayjs(schedule?.start_time).format("MMMM D, YYYY")}
          </Text>
          <Text size="lg">
            Thời gian: {dayjs(schedule?.start_time).format("h:mm A")} -{" "}
            {dayjs(schedule?.start_time)
              .add(classData?.duration, "minute")
              .format("h:mm A")}
          </Text>
          {paymentResult.status === "success" && (
            <Button color="yellow" onClick={handleAddToCalendar}>
              Add to Calendar
            </Button>
          )}
        </Stack>
      </Card>
    </Container>
  );
};

export default PaymentResultPage;
