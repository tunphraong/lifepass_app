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
  Loader,
  Notification,
  rem,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react"; // You might want to replace this with a Mantine UI icon
import dayjs from "dayjs";
import { type User } from "@supabase/supabase-js";
import { useSWRConfig } from "swr";
require("dayjs/locale/vi");
import CancelModal from "../../components/CancelModal";
import useSWR from "swr";
const supabase = createClient();

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
    price: string;
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

  const handleOpenModal = (booking: any, mode: "book" | "cancel") => {
    setSelectedClass(booking);
    setShowModal(true); // Open the modal
  };
  const handleCancelReservation = async (bookingId: string) => {
    try {
      const response = await fetch(`/app/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (response.ok) {
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
        const errorData = await response.json();
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
    <div className="container mx-auto p-4">
      {/* <ToastContainer /> */}
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Upcoming Classes ({bookings.length})
      </h1>

      <div className="space-y-4">
        {bookings.map((booking) => {
          console.log(booking);
          const { schedules, classes, studios } = booking;
          const startTime = dayjs(schedules.start_time);
          const endTime = startTime.add(classes.duration, "minute");
          return (
            <Card
              key={booking.id}
              shadow="sm"
              p="md"
              withBorder
              className="flex flex-col" // Added flex-col for vertical layout
            >
              {/* <Group position="apart"> */}
              {/* Image */}
              <Image
                src={
                  supabase.storage
                    .from("public_photos")
                    .getPublicUrl(studios.imageUrl).data.publicUrl
                }
                alt={studios.name}
                width={100} // Make image smaller
                height={80}
                radius="md"
                className="object-cover"
              />

              {/* Class Details */}
              <div style={{ flex: 1 }}>
                <Text fw={500}>{classes.name}</Text>
                <Text size="sm">{studios.name}</Text>
                <Text size="sm">
                  {new Date(schedules.start_time).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                  ,{" "}
                  {/* {new Date(schedules.start_time).toLocaleTimeString("vi-VN", {
                    hour: "numeric",
                    minute: "numeric",
                  })} */}
                  {/* <p className="text-gray-600 text-sm">
                    {startTime.format("hh:mm A")} -{" "}
                    {endTime.format("HH:mm A")}
                  </p> */}
                </Text>
                <Text>
                  {dayjs(startTime).locale("vi").format("hh:mm A")} -{" "}
                  {endTime.format("HH:mm A")}
                </Text>
                <Text size="sm">
                  {classes.duration} minutes
                </Text>
              </div>
              {/* Price */}
              <Text>
                {classes.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
              {/* </Group> */}

              {/* Cancel Button */}
              <div className="mt-4">
                {/* Button to open cancellation modal */}
                <Button
                  variant="outline"
                  color="red"
                  fullWidth
                  onClick={() => handleOpenModal(booking, "cancel")}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {showModal && selectedClass && (
        <CancelModal
          className={selectedClass.classes.name}
          startTime={selectedClass.schedules.start_time}
          studioName={selectedClass.studios.name}
          duration={selectedClass.classes.duration}
          price={selectedClass.schedules.price}
          onClose={() => setShowModal(false)}
          bookingId={selectedClass.id}
        />
      )}
    </div>
  );
}
