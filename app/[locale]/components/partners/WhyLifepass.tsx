import React from "react";
import { Card, Container, Grid, Group, Text, Title } from "@mantine/core";
import classes from "./WhyLifepass.module.css";

export default function WhyLifepass() {
  const stats = [
    {
      number: "90%",
      description: "of LifePass members are new customers for our partners.",
      footnote: "1",
    },
    {
      number: "2 in 3",
      description:
        "employees didn't have a gym membership a month prior to joining LifePass.",
      footnote: "2",
    },
    {
      number: "75%",
      description: "of first-time visitors become repeat customers.",
      footnote: "3",
    },
    // {
    //   number: "14K+",
    //   description: "companies and enterprise clients worldwide offer LifePass.",
    //   footnote: "4",
    // },
    // {
    //   number: "20M+",
    //   description: "employees with access to our fitness & wellness network.",
    //   footnote: "5",
    // },
    // {
    //   number: "300M+",
    //   description: "LifePass member visits to our network partners.",
    //   footnote: "6",
    // },
  ];

  return (
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text className={classes.uppercase}>WHY LifePass</Text>
          <Title order={2} className={classes.title}>
            Want more members? Let us do the heavy lifting.
          </Title>
          <Text size="xl" className={classes.description}>
            Local studios and global gym brands gain thousands of loyal members
            on LifePass.
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

function StatCard({ number, description, footnote }) {
  return (
    <Card className={classes.card} padding="md">
      <Title order={3} className={classes.statNumber}>
        {number}
      </Title>
      <Text c="dimmed" mb="xs">
        {description}
      </Text>
      <Text className={classes.footnote}>[{footnote}]</Text>
    </Card>
  );
}
