// CorporateWellness.jsx
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Button,
  Group,
} from "@mantine/core";
import {
  IconArrowRight,
  IconActivity,
  IconBrain,
  IconTrendingUp,
} from "@tabler/icons-react";
import classes from "./BenefitSection.module.css";
import { Link } from "../../../../navigation";
import { useTranslations } from "next-intl";

const statIcons = [IconActivity, IconBrain, IconTrendingUp];

export function BenefitSection() {
  const t = useTranslations("companies.BenefitSection");

  const stats = t.raw("stats").map((stat, index) => ({
    ...stat,
    icon: statIcons[index],
  }));

  return (
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Title order={2} className={classes.title}>
            {t("title")}
          </Title>
          <Text className={classes.description}>{t("description")}</Text>
        </div>
        <Grid gutter="lg" className={classes.statsGrid}>
          {stats.map((item, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Paper
                shadow="sm"
                p="md"
                radius="md"
                className={classes.statCard}
              >
                <Group justify="center" className={classes.iconWrapper}>
                  <item.icon size={24} className={classes.icon} />
                </Group>
                <Title order={3} className={classes.percentage}>
                  {item.percentage}
                </Title>
                <Text size="sm" c="dimmed" className={classes.statDescription}>
                  {item.description}
                </Text>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
        <Group justify="center" mt="xl">
          <Button
            component={Link}
            href="https://tally.so/r/mOLjDM"
            rightSection={<IconArrowRight size={14} />}
            className={classes.button}
            radius="lg"
          >
            {t("requestPricingButton")}
          </Button>
        </Group>
      </Container>
    </section>
  );
}
