import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Loader, Text, Table, Group, Card } from '@mantine/core';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface StudioHour {
  id: number;
  day_of_week: string;
  open_time: string;
  close_time: string;
}

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function StudioHours({ studioId }: { studioId: string }) {
  const { data, error } = useSWR<{ studio_hours: StudioHour[] }>(
    `/api/studio/${studioId}/studio-hours`,
    fetcher
  );

  if (error) return <Text c="red">Failed to load studio hours.</Text>;
  if (!data) return <Loader />;
  
  // Extract the studio_hours array from the response object
  const studioHours = data.studio_hours ?? [];

  const groupedByDay = dayOrder.map((day) => ({
    day,
    hours: studioHours.find((hour) => hour.day_of_week === day),
  }));

  return (
    <Card>
      {groupedByDay.map(({ day, hours }) => (
        <Group key={day} grow>
          <Text>{day}</Text>
          {hours
            ? `${formatTime(hours.open_time)} - ${formatTime(hours.close_time)}`
            : "Closed"}
        </Group>
      ))}
    </Card>
  );
}
