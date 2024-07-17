// app/upcoming/page.tsx
"use client";

import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
import { createClient } from "../../../utils/supabase/client";
import { showNotification } from "@mantine/notifications";
import {
  Card,
  Text,
  Button,
  Group,
  Image,
  Center,
  Container,
  Loader,
  Title,
  Badge,
  rem,
  Modal,
  NumberFormatter,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react"; // You might want to replace this with a Mantine UI icon
import dayjs from "dayjs";
import { type User } from "@supabase/supabase-js";
import { useSWRConfig } from "swr";
require("dayjs/locale/vi");
// import CancelModal from "../../components/CancelModal";
import useSWR from "swr";
import styles from "./UpcomingSchedule.module.css";

interface BookingWithDetails {
  id: string;
  created_at: string;
  status: string;
  user_id: string;
  schedule_id: string;
  schedules: {
    start_time: string;
    class_id: string;
    studio_id: string;
  };
  classes: {
    price: number;
    name: string;
    type: string;
    difficulty: string;
    instructorName: string;
    duration: number;
  };
  studios: {
    address: string;
    id: string;
    name: string;
    imageUrl: string;
    images: [string];
  };
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function UpcomingPage({ user }: { user: User | null }) {
  const { mutate } = useSWRConfig();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null); // Change to any
  const [selectedBooking, setSelectedBooking] =
    useState<BookingWithDetails | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // const handleOpenModal = (booking: any, mode: "book" | "cancel") => {
  //   setSelectedClass(booking);
  //   setShowModal(true); // Open the modal
  // };

  const handleCancelClick = (booking: BookingWithDetails) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const handleCancelReservation = async (bookingId: string) => {
    const paymentDetails = {
      bookingId: selectedBooking.id,
      // bookingId: "efaf95ba-f64b-4428-9ab0-b8410f51d737",
    };
    try {
       const refundResponse = await fetch(
         `/api/zalopay/refund`, // Your refund API route
         {
           method: "PUT", // Use PUT or PATCH for refunds
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
             paymentDetails
           }),
         }
       );
      if (refundResponse.ok) {
        // Refresh the page first
        // router.refresh();
        // Then show the toast
        // toast.success("Reservation cancelled successfully!", {
        //   autoClose: 3000, // Close toast after 3 seconds
        // });
        showNotification({
          title: "Success",
          message: "Reservation cancelled successfully!",
          color: "green",
        });
      } else {
        const errorData = await refundResponse.json();
        setError(errorData.error || "An error occurred while cancelling.");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      setError("An error occurred while cancelling.");
    }
  };

  const { data } = useSWR(
    `/api/upcoming/${user.id}`, // Fetch only when logged in
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log("data", data);
      const formattedBookings: BookingWithDetails[] = data.map((booking) => ({
        ...booking,
        classes: booking.classes, // Extract the classes object
        schedules: booking.schedules, // Select the first schedule (assuming only one)
        studios: booking.studios.studios, // Extract the studios object
      }));

      console.log("format bookings", formattedBookings);
      setBookings(formattedBookings as BookingWithDetails[]);
      setIsLoading(false);
      console.log(bookings);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  if (bookings.length === 0) {
    return (
      <Center>
        <Text color="dimmed">No upcoming classes.</Text>
      </Center>
    );
  }

  return (
    <Container size="md" className={styles.wrapper}>
      <Title className={styles.title}>
        Lịch trình sắp tới ({bookings.length}){" "}
      </Title>

      <Group gap="md">
        {bookings.map((booking) => {
          console.log(booking);
          const { schedules, classes, studios } = booking;
          const startTime = dayjs(schedules.start_time);
          const endTime = startTime.add(classes.duration, "minute");
          return (
            <Card
              key={booking.id}
              className={styles.card}
              shadow="sm"
              p="md"
              withBorder
            >
              <div className={styles.cardHeader}>
                <Text fw={700} size="lg">
                  {classes.name}
                </Text>
                <Badge color="yellow">{studios.name}</Badge>
              </div>
              <Text>
                {" "}
                {new Date(schedules.start_time).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </Text>
              {/* <Text size="sm">{item.time}</Text> */}
              <Text>
                {startTime.format("hh:mm A")} - {endTime.format("HH:mm A")}
              </Text>

              <Text className={styles.instructor}>
                Giảng viên: {schedules.instructor_name}
              </Text>

              <Text className={styles.price}>
                {classes.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>

              <Button
                variant="outline"
                color="red"
                size="sm"
                className={classes.cancelButton}
                onClick={() => handleCancelClick(booking)}
              >
                Hủy lớp
              </Button>
            </Card>
          );
        })}
      </Group>

      <Modal
        opened={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel Reservation"
        centered
      >
        {selectedBooking && (
          <div>
            <Text>
              Bạn có chắc muốn huỷ lớp <b>{selectedBooking.classes.name}</b> tại{" "}
              <b>{selectedBooking.studios.name}</b> vào{" "}
              <b>
                {new Date(
                  selectedBooking.schedules.start_time
                ).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </b>{" "}
              bắt đầu lúc{" "}
              {dayjs(selectedBooking.schedules.start_time).format("hh:mm A")}{" "}
              không?
              {/* <Text> */}
              {/* </Text> */}
            </Text>

            {/* Conditionally show refund message */}
            {dayjs(selectedBooking.schedules.start_time).diff(dayjs(), "hour") >
              24 && (
              <Text className={styles.price}>
                Bạn sẽ được hoàn tiền{" "}
                <b>
                  {selectedBooking.classes.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </b>
                . Ngoài ra, bạn có thể sẽ bị trừ một khoản phí do Zalopay quyết
                định.
              </Text>
            )}

            <div className="flex justify-end mt-4">
              <Button
                variant="default"
                onClick={() => setCancelModalOpen(false)}
              >
                Không
              </Button>
              <Button
                color="red"
                onClick={async () => {
                  await handleCancelReservation(selectedBooking.id);
                  setCancelModalOpen(false); // Close the modal
                }}
              >
                Có
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Container>
  );
}
