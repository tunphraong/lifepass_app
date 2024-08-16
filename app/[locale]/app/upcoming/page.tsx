'use client'
import React from "react";
import {
  Container,
  Title,
  Card,
  Text,
  Group,
  Badge,
  Button,
} from "@mantine/core";
import classes from "./upcoming.module.css";

interface ScheduleItem {
  title: string;
  time: string;
  date: string;
  location: string;
  instructor: string;
  price: string;
  color: string;
}

const scheduleData: ScheduleItem[] = [
  {
    title: "Yoga Class",
    time: "9:00 AM - 10:00 AM",
    date: "2024-07-15",
    location: "Studio A",
    instructor: "John Doe",
    price: "150,000 VNĐ",
    color: "#f5ac2d", // Yellow
  },
  {
    title: "Boxing Workout",
    time: "11:00 AM - 12:00 PM",
    date: "2024-07-16",
    location: "Gym B",
    instructor: "Jane Smith",
    price: "200,000 VNĐ",
    color: "#f4b82c", // YellowDiffShade
  },
  {
    title: "Dance Fitness",
    time: "5:00 PM - 6:00 PM",
    date: "2024-07-17",
    location: "Dance Studio",
    instructor: "David Johnson",
    price: "180,000 VNĐ",
    color: "#f5ac2d", // Yellow
  },
];

export default function UpcomingSchedule() {
  const handleCancel = (index: number) => {
    // Logic to handle cancellation, e.g., send API request
    console.log(`Cancelled class: ${scheduleData[index].title}`);
  };

  return (
    <Container size="md" className={classes.wrapper}>
      <Title className={classes.title}>Lịch trình sắp tới</Title>
      <Group gap="md">
        {scheduleData.map((item, index) => (
          <Card
            key={index}
            className={classes.card}
            shadow="sm"
            style={{ borderColor: item.color }}
          >
            <div className={classes.cardHeader}>
              <Text fw={700} size="lg">
                {item.title}
              </Text>
              <Badge color={item.color}>{item.location}</Badge>
            </div>
            <Text size="sm">{item.date}</Text>
            <Text size="sm">{item.time}</Text>
            <Text size="sm" className={classes.instructor}>
              Giảng viên: {item.instructor}
            </Text>
            <Text size="sm" className={classes.price}>
              Giá: {item.price}
            </Text>
            <Button
              variant="outline"
              color="red"
              size="sm"
              onClick={() => handleCancel(index)}
              className={classes.cancelButton}
            >
              Hủy lớp
            </Button>
          </Card>
        ))}
      </Group>
    </Container>
  );
}
