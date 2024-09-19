import React from "react";
import {
  Button,
  Card,
  Text,
  Title,
  Container,
  Group,
  Stack,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconCheck } from "@tabler/icons-react";
import classes from "./PricingIntroduction.module.css";
import { Link } from "../../navigation";

export default function PricingIntroduction() {
  // const plans = [
  //   { credits: 22, price: 390000 },
  //   { credits: 33, price: 548000 },
  //   { credits: 68, price: 982000 },
  //   { credits: 90, price: 1301000 },
  //   { credits: 135, price: 1939000 },
  //   { credits: 203, price: 2889000 },
  // ];

const plans = [
  { credits: 30, price: 300000 },
  { credits: 66, price: 586000 },
  { credits: 99, price: 821000 },
  { credits: 204, price: 1473000 },
  { credits: 270, price: 1952000 },
  { credits: 405, price: 2908000 },
  { credits: 608, price: 4333000 },
];

  return (
    <section className={classes.section}>
      <Container size="lg" className={classes.container}>
        <Title order={2} ta="center" mb="md" className={classes.title}>
          Fitness and Wellness for Everyone
        </Title>
        <Text
          ta="center"
          size="lg"
          mb="xs"
          mx="auto"
          className={classes.description}
        >
          Choose the plan that fits your budget and fitness needs.
        </Text>

        <Carousel
          slideSize="33.333333%"
          slideGap="lg"
          loop
          align="center"
          withIndicators
          slidesToScroll={1}
          className={classes.carousel}
          initialSlide={2}
        >
          {plans.map((plan, index) => (
            <Carousel.Slide key={index}>
              <Card
                padding="lg"
                radius="md"
                withBorder
                className={classes.card}
              >
                <Stack align="center" gap="xs">
                  <Text size="xl" fw={600}>
                    {plan.credits} credits
                  </Text>
                  <Title order={2} className={classes.price}>
                    VND {plan.price.toLocaleString()}
                    <Text component="span" size="xl" fw={400}>
                      /mo
                    </Text>
                  </Title>
                </Stack>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>

        <Stack align="center" mt="xl" mb="lg">
          <Button
            component={Link}
            href="https://tally.so/r/3yxeAd"
            size="lg"
            radius="xl"
            className={classes.button}
          >
            Sign Up
          </Button>
        </Stack>

        <Stack gap="sm" maw={600} mx="auto">
          {[
            "Book classes & appointments across Vietnam",
            "Cancel or change your renewal plan at any time",
            "Invite friends to join you and score rewards for each friend who signs up",
          ].map((feature, index) => (
            <Group key={index} align="center" gap="xs">
              <IconCheck size={20} className={classes.checkIcon} />
              <Text>{feature}</Text>
            </Group>
          ))}
        </Stack>
      </Container>
    </section>
  );
}
