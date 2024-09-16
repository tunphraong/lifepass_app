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

export default function Revenue() {
  const benefits = [
    {
      icon: IconMoneybag,
      title: "Drive Revenue",
      description:
        "Increase your recurring revenue.",
    },
    {
      icon: IconUser,
      title: "Boost membership",
      description:
        "First-time visitors can become your repeat customer",
    },
    {
      icon: IconDeviceMobile,
      title: "Brand visibility",
      description:
        "Gain brand exposure to a lot of new customers.",
    },
  ];

  return (
    <section className={classes.section}>
      <Container size="lg">
        <Title order={2} ta="center" mb="sm" className={classes.title}>
          LifePass is free to join
        </Title>
        <Text
          size="xl"
          //   c="dimmed"
          ta="center"
          mb="xl"
          fw={500}
          mx="auto"
          className={classes.description}
        >
          Pay absolutely nothing to drive more revenue, membership, and brand
          visibility for your business.
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
            Partner with LifePass
          </Button>
        </Group>
      </Container>
    </section>
  );
}
