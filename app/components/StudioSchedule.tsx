import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Center,
  Space
} from "@mantine/core";
// import { useSWR } from "swr";
import useSWR from "swr";
import dayjs from "dayjs";
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'; // Import arrow icons

// const fetchSchedules = async (date) => {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from("schedules")
//     .select("*")
//     .eq("date", date);

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

const StudioSchedule = ({ studioId }) => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const {
    data: schedules,
    error,
    isLoading,
  } = useSWR(`/api/studio/${studioId}/schedules?date=${date}`, fetcher);

  //   useEffect(() => {
  //     mutate();
  //   }, [date, mutate]);

  if (error) return <div>Failed to load schedules</div>;
  if (isLoading) return <div>Loading...</div>;

  if (!schedules) return <div>Loading...</div>;
  console.log(schedules);

  return (
    <>
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
              <Group position="apart">
                <Text>{schedule.classes.name}</Text>
                <Badge color="pink" variant="light">
                  {schedule.classes.difficulty}
                </Badge>
              </Group>
              {/* <Text size="sm" color="dimmed">
              {schedule.classes.description}
            </Text> */}
              <Text>Instructor: {schedule.instructor_name}</Text>
              <Text size="sm" color="dimmed">
                {dayjs(schedule.start_time).format("h:mm A")} -{" "}
                {dayjs(schedule.start_time)
                  .add(schedule.classes.duration, "minute")
                  .format("h:mm A")}
              </Text>
              {/* <Text>Price: ${schedule.price}</Text> */}
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
