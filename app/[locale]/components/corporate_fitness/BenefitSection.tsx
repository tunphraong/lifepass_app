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

const stats = [
  {
    icon: IconActivity,
    percentage: "178%",
    description: "Increase in employee physical activity engagement",
    footnote: "[1]",
  },
  {
    icon: IconBrain,
    percentage: "35%",
    description: "Decrease in yearly employee health-related expenses",
    footnote: "[2]",
  },
  {
    icon: IconTrendingUp,
    percentage: "43%",
    description: "Enhancement in staff retention rates",
    footnote: "[3]",
  },
];

export function BenefitSection() {
  return (
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Title order={2} className={classes.title}>
            Wellness fuels business success
          </Title>
          <Text className={classes.description}>
            LifePass promotes work-life balance, resulting in healthier
            employees, more satisfied organizations, and demonstrable cost
            savings.
          </Text>
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
                  {/* <sup className={classes.footnote}>{item.footnote}</sup> */}
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
            Request pricing
          </Button>
        </Group>
      </Container>
    </section>
  );
}
