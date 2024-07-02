import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Modal,
  Space,
  Title,
  Center,
} from "@mantine/core";
import useSWR, { mutate } from "swr";
import dayjs from "dayjs";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"; // Import arrow icons
import styles from "./StudioSchedule.module.css";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

const StudioSchedule = ({ studioId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const handleOpenModal = (schedule) => {
    setSelectedSchedule(schedule);
    setReservationSuccess(false); // Reset success state when opening modal
    open();
  };

  const handleCloseModal = () => {
    close();
    setSelectedSchedule(null);
  };
  const handleEnroll = async () => {
    if (!selectedSchedule) return;

    console.log(selectedSchedule);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedule_id: selectedSchedule.id,
          // Add other necessary booking details here
        }),
      });

      if (!response.ok) {
        // notifications.show({
        //   color: "red",
        //   position: "top-right",
        //   title: "Default notification",
        //   message: "Hey there, your code is awesome! 🤥",
        //   classNames: styles,
        // });
        throw new Error("Failed to book the schedule");
      }

      // Optionally, update the local data to reflect the new booking
      mutate(`/api/studio/${studioId}/schedules?date=${date}`);

      setReservationSuccess(true); // Set success state
    } catch (error) {
      console.error("Error booking the schedule:", error);
         
      // let errorMessage = "An unexpected error occurred";
      // if (error.message === "Unauthorized") {
      //   errorMessage = "You must be logged in to book a class.";
      // } else if (error.message === "Class is fully booked") {
      //   errorMessage = "The class is fully booked. Please try another class.";
      // } else if (error.message === "Failed to book the schedule") {
      //   errorMessage = "Failed to book the class. Please try again later.";
      // } else if (error.message.includes("supabase")) {
      //   errorMessage =
      //     "Error communicating with the server. Please try again later.";
      // }

      // notifications.show({
      //   title: "Booking failed",
      //   message: errorMessage,
      //   color: "red",
      // });
    }
  };

  const {
    data: schedules,
    error,
    isLoading,
  } = useSWR(`/api/studio/${studioId}/schedules?date=${date}`, fetcher);

  if (error) return <div>Failed to load schedules</div>;
  if (isLoading) return <div>Loading...</div>;

  if (!schedules) return <div>Loading...</div>;
  // console.log(schedules);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      <Modal opened={opened} onClose={handleCloseModal} title="Confirmation">
        {reservationSuccess ? (
          <Stack spacing="md">
            <Center>
              <Title order={3}> {selectedSchedule?.classes?.name}</Title>
            </Center>

            <Text>
              Reservation for {selectedSchedule?.classes?.name} has been booked
              successfully!
            </Text>

            <Button fullWidth color="yellow" onClick={handleCloseModal}>
              Close
            </Button>
          </Stack>
        ) : (
          selectedSchedule && (
            <Stack spacing="md">
              <Text weight={500}>{selectedSchedule.classes.name}</Text>
              <Text size="sm" color="dimmed">
                {selectedSchedule.classes.description}
              </Text>
              <Group>
                <Text>Instructor:</Text>
                <Text>{selectedSchedule.instructor_name}</Text>
              </Group>
              <Group>
                <Text>Date:</Text>
                <Text>
                  {dayjs(selectedSchedule.start_time).format("MMM D, YYYY")}
                </Text>
              </Group>
              <Group>
                <Text>Time:</Text>
                <Text>
                  {dayjs(selectedSchedule.start_time).format("h:mm A")} -{" "}
                  {dayjs(selectedSchedule.start_time)
                    .add(selectedSchedule.classes.duration, "minute")
                    .format("h:mm A")}
                </Text>
              </Group>
              <Group>
                <Text>Price:</Text>
                <Text>{formatPrice(selectedSchedule.price)}</Text>
              </Group>
              <Button fullWidth color="yellow" onClick={handleEnroll}>
                Enroll
              </Button>
            </Stack>
          )
        )}
      </Modal>
      <Space h="md" />
      <Stack spacing="md">
        <Group justify="center" style={{ width: "100%" }}>
          <ActionIcon
            variant="filled"
            color="black"
            onClick={() =>
              setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"))
            }
          >
            <IconArrowLeft />
          </ActionIcon>
          <Text>{dayjs(date).format("MMMM D, YYYY")}</Text>
          <ActionIcon
            variant="filled"
            color="black"
            onClick={() =>
              setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"))
            }
          >
            <IconArrowRight />
          </ActionIcon>
        </Group>

        {schedules.length > 0 ? (
          schedules?.map((schedule) => (
            <Card
              key={schedule.id}
              shadow="sm"
              padding="sm"
              radius="md"
              withBorder
            >
              <Group position="apart" grow>
                <div>
                  <Text>{schedule.classes.name}</Text>
                  <Text size="sm" c="dimmed">
                    {dayjs(schedule.start_time).format("h:mm A")} -{" "}
                    {dayjs(schedule.start_time)
                      .add(schedule.classes.duration, "minute")
                      .format("h:mm A")}
                  </Text>
                </div>
                <Text>Instructor: {schedule.instructor_name}</Text>

                <Button
                  className={styles.button}
                  fullWidth
                  color="yellow"
                  onClick={() => handleOpenModal(schedule)}
                  variant="filled"
                >
                  {formatPrice(schedule.price)}
                </Button>

                {/* <Badge color="pink" variant="light">
                  {schedule.classes.difficulty}
                </Badge> */}
              </Group>
              {/* <Text size="sm" color="dimmed">
              {schedule.classes.description}
            </Text> */}

              {/* <Text>Price: {schedule.price}</Text> */}

              {/* <Text>
              Enrolled: {schedule.enrolled}/{schedule.capacity}
            </Text>
            <Text>
              Cancellation Deadline:{" "}
              {dayjs(schedule.cancellation_deadline).format(
                "MMMM D, YYYY h:mm A"
              )}
            </Text> */}
            </Card>
          ))
        ) : (
          <Text>No classes scheduled for this day.</Text>
        )}
      </Stack>
    </>
  );
};

export default StudioSchedule;
