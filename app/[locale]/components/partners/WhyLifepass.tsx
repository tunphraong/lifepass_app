import React from "react";
import { Card, Container, Grid, Group, Text, Title } from "@mantine/core";
import classes from "./WhyLifepass.module.css";
import { useTranslations } from "next-intl";

export default function WhyLifepass() {
  const t = useTranslations("partners.WhyLifepass");

  const stats = t.raw("stats");

  return (
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text className={classes.uppercase}>{t("subtitle")}</Text>
          <Title order={2} className={classes.title}>
            {t("title")}
          </Title>
          <Text size="xl" className={classes.description}>
            {t("description")}
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
