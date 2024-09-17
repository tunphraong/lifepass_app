import { useState } from "react";
import { Button, Popover, ScrollArea, Text, Group, Stack } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const popularActivities = [
  "Boxing",
  "Cardio",
  "Core",
  "Sports recovery",
  "Cycling",
  "Fitness",
  "HIIT",
  "Meditation",
  "Pilates",
  "Wellness",
  "Yoga",
];

const allActivities = [
  "Complementary medicine",
  "Aquarobics",
  "Bodybuilding",
  "Boxing",
  "Cardio",
  "Chronic disease management",
  "Rock Climbing",
  "Core",
  "CrossFit",
  "Dance",
  "Fitness",
  "HIIT",
  "Meditation",
  "Pilates",
  "Sleep",
  "Wellness",
  "Yoga",
];

export function ActivitiesDropdown({ onFilterChange }) {
  const [selectedActivities, setSelectedActivities] = useState([]);

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const clearSelection = () => {
    setSelectedActivities([]);
    onFilterChange([]);
  };

  const applySelection = () => {
    onFilterChange(selectedActivities);
  };

  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button radius="xl" variant="outline" rightSection={<IconChevronDown size={14} />}>
          Activities
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <ScrollArea h={400}>
          <Stack>
            <Text fw={700}>Popular</Text>
            <Group gap="xs">
              {popularActivities.map((activity) => (
                <Button
                  key={activity}
                  variant={
                    selectedActivities.includes(activity) ? "filled" : "outline"
                  }
                  onClick={() => toggleActivity(activity)}
                  radius="xl"
                  size="xs"
                >
                  {activity}
                </Button>
              ))}
            </Group>
            <Text fw={700}>All</Text>
            <Group gap="xs">
              {allActivities.map((activity) => (
                <Button
                  key={activity}
                  variant={
                    selectedActivities.includes(activity) ? "filled" : "outline"
                  }
                  onClick={() => toggleActivity(activity)}
                  radius="xl"
                  size="xs"
                >
                  {activity}
                </Button>
              ))}
            </Group>
          </Stack>
        </ScrollArea>
        <Group grow mt="md">
          <Button variant="subtle" onClick={clearSelection}>
            Clear
          </Button>
          <Button onClick={applySelection}>Apply</Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
