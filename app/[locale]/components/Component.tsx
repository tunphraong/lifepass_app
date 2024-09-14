import React from "react";
import {
  Button,
  Card,
  Container,
  Group,
  Input,
  Stack,
  Text,
  Title,
  Box,
} from "@mantine/core";
import {
  IconChevronDown,
  IconMapPin,
  IconX,
  IconMenu2,
  IconSearch,
  IconEdit3,
} from "@tabler/icons-react";
import classes from "./Component.module.css";

export default function Component() {
  const facilities = [
    {
      name: "Mandala Wellness",
      type: "Wellness • Yoga • Complementary Medicine",
      distance: "2 km",
      hours: "9:00 AM - 5:00 PM",
      color: "purple",
    },
    {
      name: "Vertical Academy",
      type: "Rock Climbing Gym",
      distance: "2.3 km",
      hours: "8:00 AM - 10:00 PM",
      color: "blue",
    },
    {
      name: "Reborn Fitness and Health",
      type: "Sports Recovery • Private Gym • Sauna",
      distance: "2.3 km",
      hours: "8:00 AM - 7:00 PM",
      color: "green",
    },
  ];

  return (
    <Box className={classes.wrapper}>
      <header className={classes.header}>
        <Title order={3} c="red.6">
          LifePass
        </Title>
        <Group>
          <img
            src="/placeholder.svg?height=24&width=24"
            alt="US Flag"
            className={classes.flag}
          />
          <Button variant="subtle" p={0}>
            <IconMenu2 size={24} />
          </Button>
        </Group>
      </header>
      <Box className={classes.banner}>
        <Button className={classes.bannerButtonWhite}>Get LifePass</Button>
        <Button variant="outline" className={classes.bannerButtonOutline}>
          Login
        </Button>
        <Button variant="subtle" className={classes.bannerButtonGhost}>
          <IconX size={24} />
        </Button>
      </Box>
      <Container size="sm" className={classes.content}>
        <Box className={classes.searchWrapper}>
          <Input
            placeholder="Gyms, studios, activities"
            icon={<IconSearch size={16} />}
            radius="xl"
          />
        </Box>
        <Group spacing="xs" className={classes.filterButtons}>
          <Button
            variant="outline"
            radius="xl"
            rightIcon={<IconChevronDown size={16} />}
          >
            Plan
          </Button>
          <Button
            variant="outline"
            radius="xl"
            rightIcon={<IconChevronDown size={16} />}
          >
            Activities
          </Button>
          <Button
            variant="outline"
            radius="xl"
            leftIcon={<IconEdit3 size={16} />}
          >
            Exclusive on LifePass
          </Button>
        </Group>
        <Box ta="center" my="md">
          <IconMapPin size={24} color="gray" />
        </Box>
        <Stack gap="md">
          {facilities.map((facility, index) => (
            <Card key={index} padding="md" radius="md">
              <Group>
                <Box
                  className={classes.facilityIcon}
                  style={{
                    backgroundColor: `var(--mantine-color-${facility.color}-1)`,
                    color: `var(--mantine-color-${facility.color}-6)`,
                  }}
                >
                  {facility.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </Box>
                <Box>
                  <Text fw={700}>{facility.name}</Text>
                  <Text size="sm" c="dimmed">
                    {facility.type}
                  </Text>
                </Box>
              </Group>
              <Group mt="sm" gap="xs">
                <IconMapPin size={16} color="gray" />
                <Text size="sm" c="dimmed">
                  {facility.distance} • {facility.hours}
                </Text>
              </Group>
            </Card>
          ))}
        </Stack>
      </Container>
      <Box className={classes.footer}>
        <Button fullWidth color="red">
          Check eligibility
        </Button>
      </Box>
    </Box>
  );
}
