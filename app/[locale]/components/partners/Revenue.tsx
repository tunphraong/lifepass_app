import React from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { IconMoneybag, IconUser, IconDeviceMobile } from "@tabler/icons-react";
import classes from "./Revenue.module.css";
import { Link } from "../../../../navigation";
import { useTranslations } from "next-intl";

export default function Revenue() {
  const t = useTranslations("partners.Revenue");

  const benefitIcons = [IconMoneybag, IconUser, IconDeviceMobile];

  const benefits = t.raw("benefits").map((benefit, index) => ({
    ...benefit,
    icon: benefitIcons[index],
  }));

  return (
    <section className={classes.section}>
      <Container size="lg">
        <Title order={2} ta="center" mb="sm" className={classes.title}>
          {t("title")}
        </Title>
        <Text
          size="xl"
          ta="center"
          mb="xl"
          fw={500}
          mx="auto"
          className={classes.description}
        >
          {t("description")}
        </Text>
        <Grid mb="xl">
          {benefits.map((benefit, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Card className={classes.card} padding="xl">
                <Group justify="center" mb="md">
                  <div className={classes.iconWrapper}>
                    <benefit.icon size={32} stroke={1.5} />
                  </div>
                </Group>
                <Title order={3} ta="center" mb="sm">
                  {benefit.title}
                </Title>
                <Text c="dimmed" ta="center">
                  {benefit.description}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        <Group justify="center">
          <Button
            component={Link}
            href="https://tally.so/r/mBGqV7"
            className={classes.button}
            size="lg"
          >
            {t("buttonText")}
          </Button>
        </Group>
      </Container>
    </section>
  );
}
