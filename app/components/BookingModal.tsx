import { Modal, Text, Button, Group, Stack } from "@mantine/core";
import dayjs from "dayjs";

const ScheduleModal = ({ opened, onClose, schedule }) => {
  if (!schedule) return null;

  return (
    <Modal opened={opened} onClose={onClose} title="Class Details">
      <Stack spacing="md">
        <Text weight={500}>{schedule.classes.name}</Text>
        <Text size="sm" color="dimmed">
          {schedule.classes.description}
        </Text>
        <Group>
          <Text>Instructor:</Text>
          <Text>{schedule.instructor_name}</Text>
        </Group>
        <Group>
          <Text>Time:</Text>
          <Text>
            {dayjs(schedule.start_time).format("h:mm A")} -{" "}
            {dayjs(schedule.start_time)
              .add(schedule.classes.duration, "minute")
              .format("h:mm A")}
          </Text>
        </Group>
        <Group>
          <Text>Price:</Text>
          <Text>
            {schedule.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </Group>
        <Button fullWidth color="yellow" onClick={onClose}>
          Enroll
        </Button>
      </Stack>
    </Modal>
  );
};

export default ScheduleModal;
