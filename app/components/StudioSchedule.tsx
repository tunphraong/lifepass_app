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
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
// dayjs.extend(isSameOrAfter);

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

const StudioSchedule = ({ studioId }) => {
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

  const handleEnroll = (schedule) => {
    router.push(`/app/payment?scheduleId=${schedule.id}`);
  };

  const {
    data: schedules,
    error,
    isLoading,
  } = useSWR(`/api/studio/${studioId}/schedules?date=${date}`, fetcher);

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Filter out past classes based on current time
  const upcomingSchedules = schedules.filter((schedule) =>
    dayjs(schedule.start_time).isAfter(dayjs())
  );

  return (
    <>
      <Modal opened={opened} onClose={handleCloseModal} title="Confirmation">
        {reservationSuccess ? (
          <Stack gap="md">
            <Center>
              <Title order={3}> {selectedSchedule?.classes?.name}</Title>
            </Center>

            <Text>Bạn đã ghi danh thành công cho lớp này!</Text>

            <Button fullWidth color="yellow" onClick={handleCloseModal}>
              Close
            </Button>
          </Stack>
        ) : (
          selectedSchedule && (
            <Stack gap="md">
              <Text fw={500}>{selectedSchedule.classes.name}</Text>
              <Text size="sm" c="dimmed">
                {selectedSchedule.classes.description}
              </Text>
              <Group>
                <Text>Huấn luyện viên:</Text>
                <Text>{selectedSchedule.instructor_name}</Text>
              </Group>
              <Group>
                <Text>Ngày:</Text>
                <Text>
                  {dayjs(selectedSchedule.start_time).format("MMM D, YYYY")}
                </Text>
              </Group>
              <Group>
                <Text>Giờ:</Text>
                <Text>
                  {dayjs(selectedSchedule.start_time).format("h:mm A")} -{" "}
                  {dayjs(selectedSchedule.start_time)
                    .add(selectedSchedule.classes.duration, "minute")
                    .format("h:mm A")}
                </Text>
              </Group>
              {/* {!userSession && (
                <Button
                  fullWidth
                  color="blue"
                  onClick={() => router.push("/app/login")}
                >
                  Đăng nhập để xem giá
                </Button>
              )} */}
              {userSession && (
                <Group>
                  <Text>Giá:</Text>
                  <Text>{formatPrice(selectedSchedule.price)}</Text>
                </Group>
              )}
              <Button fullWidth color="yellow" onClick={handleEnroll}>
                Tham gia
              </Button>
            </Stack>
          )
        )}
      </Modal>
      <Space h="md" />
      <Stack gap="md">
        <Group
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

          {/* <Text>{dayjs(date).locale("vi").format("DD, MMMM, YYYY")}</Text> */}

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
        </Group>

        {upcomingSchedules.length > 0 ? (
          upcomingSchedules.map((schedule) => (
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
      {/* <Stack gap="md">
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
          <Text>{dayjs(date).locale("vi").format("DD, MMMM, YYYY")}</Text>
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
              <Group justify="space-between" grow>
                <div>
                  <Text>{schedule.classes.name}</Text>
                  <Text size="sm" c="dimmed">
                    {dayjs(schedule.start_time).format("h:mm A")} -{" "}
                    {dayjs(schedule.start_time)
                      .add(schedule.classes.duration, "minute")
                      .format("h:mm A")}
                  </Text>
                </div>
                <Text>Huấn luyện viên: {schedule.instructor_name}</Text>

                <Button
                  className={styles.button}
                  fullWidth
                  color="yellow"
                  onClick={() => handleEnroll(schedule)}
                  variant="filled"
                >
                  {formatPrice(schedule.price)}
                </Button>
              </Group>
            </Card>
          ))
        ) : (
          <Text>Không có lớp nào được lên lịch cho ngày này.</Text>
        )}
      </Stack> */}
    </>
  );
};

export default StudioSchedule;
