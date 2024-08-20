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
import { useRouter } from "../../navigation";
import { IconChevronRight, IconCalendar } from "@tabler/icons-react";
import { createClient } from "../../utils/supabase/client";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"; // ES 2015
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";
import "dayjs/locale/vi";
dayjs.locale("vi");

dayjs.extend(isSameOrBefore);

const StudioSchedule = ({ studioId, filter, onClassClick, loggedIn }) => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  };
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const supabase = createClient();
  const [userSession, setUserSession] = useState(null); // State to hold user session
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const startDate = dayjs(date).startOf("week").format("YYYY-MM-DD");
  const endDate = dayjs(date).endOf("week").format("YYYY-MM-DD");
  const [currentDate, setCurrentDate] = useState(dayjs().startOf("day"));
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [selectedClassName, setSelectedClassName] = useState<string | null>(
    null
  );
  const t = useTranslations("StudioSchedule");
  const format = useFormatter();

  const handleEnroll = (schedule) => {
    router.push(
      `/app/payment?scheduleId=${schedule.id}&studioId=${schedule.studio_id}`
    );
  };

  // const handleClassClick = (schedule) => {
  //   const className = schedule.classes.name.toLowerCase().replace(/ /g, "-");
  //   router.push(`/app/classes/${schedule.studio_id}/${className}`);
  // };

  // Function to handle class name click
  const handleClassNameClick = (className: string) => {
    setSelectedClassName(className); // Update selected class name state
  };

  const weekStart = selectedDay.startOf("week").format("YYYY-MM-DD");
  const weekEnd = selectedDay.endOf("week").format("YYYY-MM-DD");

  const {
    data: schedules,
    error,
    isLoading,
  } = useSWR(
    `/api/studio/${studioId}/schedules?weekStart=${weekStart}&weekEnd=${weekEnd}`,
    fetcher
  );  

  if (error) return <div>{t("failedToLoad")}</div>;
  if (isLoading) {
    return (
      <Stack gap="sm">
        <Skeleton height={20} radius="md" />
        <Skeleton height={20} radius="md" />
        <Skeleton height={20} radius="md" />
      </Stack>
    );
  }

  if (!schedules) return <div>{t("loading")}</div>;
  // console.log(schedules);

   const handleDayChange = (newDay) => {
     if (newDay.isAfter(dayjs().startOf("day").subtract(1, "day"))) {
       if (newDay.isAfter(selectedDay.endOf("week"))) {
         handleWeekChange(1);
       }
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

  const filteredSchedules = schedules.filter(
    (schedule) =>
      dayjs(schedule.start_time).isSame(selectedDay, "day") &&
      dayjs(schedule.start_time).isAfter(dayjs()) &&
      schedule.lifepass_spots > 0 &&
      schedule.enrolled < schedule.lifepass_spots &&
      schedule.price > 0 &&
      (!filter || schedule.classes.name === filter) // Apply filter
  );

  return (
    <>
      <Space h="md" />
      <Stack gap="md">
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
                {/* {selectedDay.format("DD/MM/YYYY")} */}
                {format.dateTime(selectedDay.toDate(), {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
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
                {/* {day.format("ddd")} */}
                {format.dateTime(day.toDate(), {
                  weekday: "short"
                })}
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
                  <Text
                    fw={500}
                    onClick={() => onClassClick(schedule.classes)}
                    className={styles.classNameButton}
                  >
                    {schedule.classes.name}
                  </Text>
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

                {loggedIn ? (
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
                ) : (
                  <Button
                    className={styles.button}
                    fullWidth
                    color="yellow"
                    onClick={() => handleEnroll(schedule)}
                    variant="filled"
                    radius="xl"
                    size="sm"
                  >
                    {t("seePrice")}
                  </Button>
                )}
              </Group>
            </Card>
          ))
        ) : (
          <Center>
            <Stack gap="sm" align="center">
              <Text fw={500} size="xl">
                {t("noClasses")}
              </Text>
            </Stack>
          </Center>
        )}

        <Button
          variant="outline"
          color="yellow"
          radius="xl"
          size="md"
          onClick={() => handleDayChange(selectedDay.add(1, "day"))}
        >
          {t("nextDay")}
        </Button>
      </Stack>
    </>
  );
};

export default StudioSchedule;
