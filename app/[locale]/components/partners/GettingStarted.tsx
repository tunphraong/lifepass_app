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

export default function GettingStarted() {
  const steps = [
    {
      title: "Create your profile",
      description:
        "Add your business info, branding, activities, and schedules.",
    },
    {
      title: "Integrate CMS to increase membership",
      description:
        "Drive more visits and offer a seamless check-in experience.",
    },
    {
      title: "Get paid each month",
      description:
        "Receive a direct-deposit for every visit in a monthly period.",
    },
  ];

  return (
    <section className={classes.section}>
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, lg:7  }}>
            <Text className={classes.uppercase}>GETTING STARTED</Text>
            <Title order={2} className={classes.title}>
              How to join our network for free
            </Title>
            <Text size="xl" mb="xl">
              Send us a request to register your business, then get started in
              just a few simple steps.
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
            <Button className={classes.button} >Partner with Wellhub</Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg:5  }}
          
          className={classes.phoneColumn}>
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
                  <Stack gap="xs"  size="sm">
                    <Group>
                      <IconMapPin size={16} />
                      <Text>123 White St, New York, NY</Text>
                    </Group>
                    <Group>
                      <IconPhone size={16} />
                      <Text>+1 201-444-6879</Text>
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
