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
  Box,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import useSWR, { mutate } from "swr";
import dayjs from "dayjs";
import {
  IconArrowLeft,
  IconArrowRight,
  IconClock,
  IconUser,
} from "@tabler/icons-react"; // Import arrow icons
import styles from "./StudioSchedule.module.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { IconChevronRight, IconCalendar } from "@tabler/icons-react";
import { createClient } from "../../utils/supabase/client";
require("dayjs/locale/vi");
// var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"; // ES 2015

dayjs.extend(isSameOrBefore);

const StudioSchedule = ({ studioId }) => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    if (data) {
      // Fetch prices for each schedule in parallel
      const pricePromises = data.map(async (schedule) => {
        const priceRes = await fetch("/api/calculate-price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studioId,
            classId: schedule.class_id,
            startTime: schedule.start_time,
            spotsRemaining: schedule.capacity - schedule.enrolled,
          }),
        });
        const priceData = await priceRes.json();
        return { ...schedule, price: priceData.price }; // Add price to schedule data
      });

      const schedulesWithPrice = await Promise.all(pricePromises);
      return schedulesWithPrice;
    } else {
      return null;
    }

    return data;
  };
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const supabase = createClient();
  const [userSession, setUserSession] = useState(null); // State to hold user session
  useEffect(() => {
    // Check Supabase session on component mount
    const session = supabase.auth.getSession();
    console.log("userSession", userSession);
    setUserSession(session);
  }, []);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const startDate = dayjs(date).startOf("week").format("YYYY-MM-DD");
  const endDate = dayjs(date).endOf("week").format("YYYY-MM-DD");
  const [currentDate, setCurrentDate] = useState(dayjs().startOf("day"));
  const [selectedDay, setSelectedDay] = useState(currentDate);

  const handleEnroll = (schedule) => {
    router.push(`/app/payment?scheduleId=${schedule.id}`);
  };

    const weekStart = selectedDay.startOf("week").format("YYYY-MM-DD");
    const weekEnd = selectedDay.endOf("week").format("YYYY-MM-DD");

  // const {
  //   data: schedules,
  //   error,
  //   isLoading,
  // } = useSWR(
  //   `/api/studio/${studioId}/schedules?startDate=${startDate}&endDate=${endDate}`,
  //   fetcher
  // );

    const {
      data: schedules,
      error,
      isLoading,
    } = useSWR(
      `/api/studio/${studioId}/schedules?weekStart=${weekStart}&weekEnd=${weekEnd}`,
      fetcher
    );

  // console.log('schedules', schedules);

  if (error) return <div>Failed to load schedules</div>;
  if (isLoading) {
    return (
      <Stack gap="sm">
        <Skeleton height={20} radius="md" />
        <Skeleton height={20} radius="md" />
        <Skeleton height={20} radius="md" />
      </Stack>
    );
  }

  if (!schedules) return <div>Loading...</div>;
  // console.log(schedules);

    const handleDayChange = (newDay) => {
      if (newDay.isAfter(dayjs().startOf("day").subtract(1, "day"))) {
        setSelectedDay(newDay);
      }
    };

  
  const handleWeekChange = (direction) => {
    const newDate = currentDate.add(direction, "week");
    if (newDate.isAfter(dayjs().startOf("week").subtract(1, "week"))) {
      setCurrentDate(newDate);
      setSelectedDay(newDate.startOf("week"));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Filter out past classes based on current time
  // const upcomingSchedules = schedules.filter((schedule) =>
  //   dayjs(schedule.start_time).isAfter(dayjs())
  // );

  const filteredSchedules = schedules.filter((schedule) =>
    dayjs(schedule.start_time).isSame(selectedDay, "day")
  );

  return (
    <>
      <Space h="md" />
      <Stack gap="md">
        {/* <Group
          justify="center"
          style={{ width: "100%" }}
          // noWrap={isSmallScreen}
        >
          <Button
            variant="filled"
            color="yellow"
            radius="xl"
            size={isSmallScreen ? "md" : "lg"}
            onClick={() =>
              setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"))
            }
            disabled={dayjs(date).isSame(dayjs(), "day")}
          >
            <IconArrowLeft size={isSmallScreen ? 16 : 20} />
          </Button>

          <Box p="md">
            <Group
            // noWrap={isSmallScreen}
            >
              <IconCalendar size={isSmallScreen ? 16 : 20} />
              <Text size={isSmallScreen ? "sm" : "md"}>
                {dayjs(date).locale("vi").format("DD, MMMM")}
              </Text>
            </Group>
          </Box>

          <Button
            variant="filled"
            color="yellow"
            radius="xl"
            size={isSmallScreen ? "md" : "lg"}
            onClick={() =>
              setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"))
            }
          >
            <IconArrowRight size={isSmallScreen ? 16 : 20} />
          </Button>
        </Group> */}

        <Group justify="center" style={{ width: "100%" }}>
          <Button
            variant="filled"
            color="yellow"
            radius="xl"
            size={isSmallScreen ? "md" : "lg"}
            onClick={() => handleWeekChange(-1)}
            disabled={currentDate
              .startOf("week")
              .isSameOrBefore(dayjs().startOf("week"))}
          >
            <IconArrowLeft size={isSmallScreen ? 16 : 20} />
          </Button>

          <Box p="md">
            <Group>
              <IconCalendar size={isSmallScreen ? 16 : 20} />
              <Text size={isSmallScreen ? "sm" : "md"}>
                {selectedDay.locale("vi").format("DD, MMMM")}
              </Text>
            </Group>
          </Box>

          <Button
            variant="filled"
            color="yellow"
            radius="xl"
            size={isSmallScreen ? "md" : "lg"}
            onClick={() => handleWeekChange(1)}
          >
            <IconArrowRight size={isSmallScreen ? 16 : 20} />
          </Button>
        </Group>

        <Group justify="center" style={{ width: "100%" }}>
          {[...Array(7)].map((_, i) => {
            const day = currentDate.startOf("week").add(i, "day");
            return (
              <Button
                key={i}
                variant={selectedDay.isSame(day, "day") ? "filled" : "outline"}
                color="yellow"
                radius="xl"
                size="md"
                onClick={() => handleDayChange(day)}
                disabled={day.isBefore(dayjs().startOf("day"))}
              >
                {day.format("ddd")}
              </Button>
            );
          })}
        </Group>

        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <Card
              key={schedule.id}
              shadow="sm"
              padding="sm"
              radius="md"
              withBorder
            >
              <Group justify="space-between" grow>
                <div>
                  <Text fw={500}>{schedule.classes.name}</Text>
                  <Text size="sm" c="dimmed">
                    <IconClock size={16} style={{ verticalAlign: "middle" }} />{" "}
                    {dayjs(schedule.start_time).format("h:mm A")} -{" "}
                    {dayjs(schedule.start_time)
                      .add(schedule.classes.duration, "minute")
                      .format("h:mm A")}
                  </Text>
                </div>
                <Text>
                  <IconUser size={16} style={{ verticalAlign: "middle" }} />{" "}
                  {schedule.instructor_name}
                </Text>

                <Button
                  className={styles.button}
                  fullWidth
                  color="yellow"
                  onClick={() => handleEnroll(schedule)}
                  variant="filled"
                  radius="xl"
                  size="sm"
                >
                  {formatPrice(schedule.price)}
                </Button>
              </Group>
            </Card>
          ))
        ) : (
          <Text>Không có lớp nào được lên lịch cho ngày này.</Text>
        )}
      </Stack>
    </>
  );
};

export default StudioSchedule;
