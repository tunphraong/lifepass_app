import React from "react";
import {
  Button,
  Container,
  Grid,
  Group,
  List,
  Stack,
  Text,
  Title,
  Box,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconHeart,
  IconStar,
  IconMapPin,
  IconPhone,
  IconWorld,
  IconChevronRight,
} from "@tabler/icons-react";
import classes from "./GettingStarted.module.css";
import { Link } from "../../../../navigation";

export default function GettingStarted() {
  const steps = [
    {
      title: "Set up your profile",
      description:
        "Input your business details, brand elements, offered activities, and schedules.",
    },
    {
      title: "Increase membership",
      description: "Drive more visits.",
    },
    {
      title: "Receive monthly payments",
      description:
        "Get bank-transfer for every visit in a monthly period.",
    },
  ];

  return (
    <section className={classes.section}>
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Text className={classes.uppercase}>JOIN OUR NETWORK</Text>
            <Title order={2} className={classes.title}>
              Become a LifePass partner for free
            </Title>
            <Text size="xl" mb="xl">
              Apply to register your business, then get started in just a few
              simple steps.
            </Text>
            <List spacing="lg" size="lg" mb="xl" center>
              {steps.map((step, index) => (
                <List.Item
                  key={index}
                  icon={<div className={classes.stepIcon}>{index + 1}</div>}
                >
                  <Text fw={600} size="xl">
                    {step.title}
                  </Text>
                  <Text>{step.description}</Text>
                </List.Item>
              ))}
            </List>
            <Button
              className={classes.button}
              component={Link}
              href="https://tally.so/r/mBGqV7"
              variant="light"
              radius="xl"
            >
              Partner with LifePass
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 5 }} className={classes.phoneColumn}>
            <Box className={classes.phoneWrapper}>
              <div className={classes.phone}>
                <div className={classes.phoneNotch}>
                  <div className={classes.phoneNotchInner}></div>
                </div>
                <div className={classes.phoneContent}>
                  <Group justify="space-between" mb="md">
                    <IconChevronLeft size={24} />
                    <IconHeart size={24} color="red" />
                  </Group>
                  <Group mb="xs">
                    <Text fw={700} size="xl">
                      4.7
                    </Text>
                    <Text c="yellow">★★★★★</Text>
                    <Text c="dimmed">(100)</Text>
                  </Group>
                  <Title order={3} mb="xs">
                    Yoga Studio
                  </Title>
                  <Text c="dimmed" mb="md">
                    Facility
                  </Text>
                  <Group mb="md">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={classes.imagePreview}></div>
                    ))}
                  </Group>
                  <Stack gap="xs">
                    <Group>
                      <IconMapPin size={16} />
                      <Text>123 Hai Bà Trưng, Quận 1, Tp. Hồ Chí Minh</Text>
                    </Group>
                    <Group>
                      <IconPhone size={16} />
                      <Text>+84 035-444-6879</Text>
                    </Group>
                    <Group>
                      <IconWorld size={16} />
                      <Text>yogastudio.com</Text>
                    </Group>
                  </Stack>
                  <Group justify="space-between" mt="md">
                    <Text fw={600}>About Yoga Studio</Text>
                    <IconChevronRight size={24} />
                  </Group>
                </div>
              </div>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
