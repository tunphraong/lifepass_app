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
import { useTranslations } from "next-intl";

export default function GettingStarted() {
  const t = useTranslations("partners.GettingStarted");

  const steps = t.raw("steps");

  return (
    <section className={classes.section}>
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Text className={classes.uppercase}>{t("subtitle")}</Text>
            <Title order={2} className={classes.title}>
              {t("title")}
            </Title>
            <Text size="xl" mb="xl">
              {t("description")}
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
              {t("buttonText")}
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
                      {t("phoneDemo.rating")}
                    </Text>
                    <Text c="yellow">★★★★★</Text>
                    <Text c="dimmed">{t("phoneDemo.reviews")}</Text>
                  </Group>
                  <Title order={3} mb="xs">
                    {t("phoneDemo.title")}
                  </Title>
                  <Text c="dimmed" mb="md">
                    {t("phoneDemo.facilityType")}
                  </Text>
                  <Group mb="md">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={classes.imagePreview}></div>
                    ))}
                  </Group>
                  <Stack gap="xs">
                    <Group>
                      <IconMapPin size={16} />
                      <Text>{t("phoneDemo.address")}</Text>
                    </Group>
                    <Group>
                      <IconPhone size={16} />
                      <Text>{t("phoneDemo.phone")}</Text>
                    </Group>
                    <Group>
                      <IconWorld size={16} />
                      <Text>{t("phoneDemo.website")}</Text>
                    </Group>
                  </Stack>
                  <Group justify="space-between" mt="md">
                    <Text fw={600}>{t("phoneDemo.about")}</Text>
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
