import { Button, Container, Title, Text, Badge, Group, Divider, Stack } from "@mantine/core";
// import { Check } from "tabler-icons-react";
import { IconCheck } from "@tabler/icons-react";
import styles from "./PricingIntroduction.module.css";
import { Link } from "../../navigation";


const plans = [
  {
    title: "S",
    price: "599000₫",
    description: "Access to all standard classes",
    features: [
      // "Unlimited class bookings",
      "Access to all locations",
      // "Free guest passes",
    ],
    example: [
      { name: "Gym access", count: 5, price: 250000 },
      { name: "Yoga class", count: 1, price: 190000 },
      { name: "Swimming session", count: 1, price: 159000 },
    ],
  },
  {
    title: "M",
    price: "899000₫",
    description: "Access to all premium classes",
    features: [
      // "Unlimited class bookings",
      "Access to all locations",
      // "Free guest passes",
      // "Priority booking",
    ],
    example: [
      { name: "Gym access", count: 5, price: 250000 },
      { name: "Yoga class", count: 2, price: 380000 },
      { name: "Dance session", count: 1, price: 250000 },
    ],
  },
  {
    title: "L",
    price: "1199000₫",
    description: "Best for enthusiasts",
    features: [
      // "Unlimited class bookings",
      "Access to all locations",
      // "Free guest passes",
      // "Priority booking",
    ],
    example: [
      { name: "Gym access", count: 5, price: 250000 },
      { name: "Yoga class", count: 2, price: 380000 },
      { name: "Pilates group", count: 1, price: 400000 },
      { name: "Ice Bath", count: 1, price: 179000 },
    ],
  },
];

export function PricingIntroduction() {
  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.textCenter}>
          <Badge variant="filled" color="yellow" size="lg" radius="sm">
            Pricing
          </Badge>
          <Title order={2} mt="sm">
            Affordable Fitness for Everyone
          </Title>
          <Text size="lg" color="dimmed" mt="sm">
            Choose the plan that fits your budget and fitness needs.
          </Text>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.spaceY4}>
                <Title className={styles.cardTitle}>{plan.title}</Title>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.pricePerMonth}>/month</span>
                </div>
                <Text color="dimmed">{plan.description}</Text>
              </div>
              <div className={styles.featuresList}>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={styles.featureItem}>
                    <IconCheck size={18} stroke={1.5} color="yellow" />
                    <Text>{feature}</Text>
                  </div>
                ))}
              </div>
              <Divider my="md" />
              <Text fw={500} mb="xs">
                Example usage:
              </Text>
              <Stack gap="xs">
                {plan.example.map((activity, actIndex) => (
                  <Group key={actIndex} gap="xs">
                    <Text size="sm">
                      {activity.name} x {activity.count}
                    </Text>
                    <Text size="sm" fw={500}>
                      {activity.price.toLocaleString()}₫
                    </Text>
                  </Group>
                ))}
              </Stack>
              <Button
                component={Link}
                href="https://tally.so/r/3yxeAd"
                fullWidth
                mt="xl"
                radius="md"
                color="yellow"
              >
                Sign Up
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
