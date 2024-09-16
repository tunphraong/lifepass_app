import React from "react";
import { Card, Container, Grid, Group, Text, Title } from "@mantine/core";
import classes from "./WhyLifepass.module.css";

export default function WhyLifepass() {
  const stats = [
    {
      number: "90%",
      description:
        "of Lifepass users are first-time customers for our partner facilities.",
    },
    {
      number: "2 out of 3",
      description:
        "employees were not gym members in the month before joining Lifepass.",
    },
    {
      number: "75%",
      description: "of initial visitors become regular patrons.",
    },
  ];

  return (
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text className={classes.uppercase}>WHY Lifepass</Text>
          <Title order={2} className={classes.title}>
            Expand your client base effortlessly with our platform.
          </Title>
          <Text size="xl" className={classes.description}>
            Lifepass helps fitness and wellness studios attract and retain dedicated members.
          </Text>
        </div>
        <Grid>
          {stats.map((stat, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <StatCard {...stat} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

function StatCard({ number, description }) {
  return (
    <Card className={classes.card} padding="md">
      <Title order={3} className={classes.statNumber}>
        {number}
      </Title>
      <Text c="dimmed" mb="xs">
        {description}
      </Text>
    </Card>
  );
}
